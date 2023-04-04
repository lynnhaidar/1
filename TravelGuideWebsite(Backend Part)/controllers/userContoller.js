const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const sendMail = require("../utils/email").sendMail;
const crypto = require("crypto");
const {promisify} = require("util");

const jwt = require("jsonwebtoken")

const signToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN}); //takes a secret and ID and the Expiry date together using algorithms (like RSA) to sign the token
};

//Creating a function that will send the token to the user
const createSendToken = (user,statusCode,res,msg) => {
    const token = signToken(user._id);

    res.status(statusCode).json({
        status: "Success",
        msg,
        token,
        data: {
            message:msg,
            user,
        },
    });
};

exports.signingUp = async(req,res) =>{
    try{
        //Checking if the email is valid
        let email = req.body.email;
        if(!validator.isEmail(email)){
            res.status(400).json({message: "Invalid email"});
        }

        //Checking if the email is already in use
        const checkEmail = await User.findOne({email: req.body.email});
        if(checkEmail){
            res.status(409).json({message: "Email already in use."}) //409 is conflict
        }

        //Checking if the password and passwordConfirm are the same
        let pass = req.body.password;
        let passConfirm = req.body.passwordConfirm;

        if(pass !== passConfirm){
            return res.status(400).json({message: "Passwords don't match."})
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(pass, 12);

        //Create the new user
        const newUser = await User.create({
            fullName: req.body.fullName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            phonenumber: req.body.phonenumber
        });

        await newUser.save();
        res.status(201).json({message: "User created succesfully.", data:{ newUser } });

    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message});
    }

};

//for logging in:
exports.login = async(req,res) =>{
    try{
        //Checking if the email exists in the database
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({message: "Sorry, The user doesn't exist"});
        }

        //Checking if the entered password is matching with the hashed stored password
        let u=await user.checkPassword(req.body.password, user.password)
        if(!u){
            return res.status(401).json({message: "Incorrect email or password"});
        }

        //Reaching here means that everything is okay => Log the user in
        return res.status(200).json({message: "You are logged in succesfully! Welcome!"});

    }catch(err){
        console.log(err);
    }
};

// we installed npm install nodemailer
exports.forgotPassword = async(req,res)=>{
    try{
        //Checking if the user with the provided email exists
        const user=await User.findOne({email: req.body.email});
        if(!user){
            return response.status(404).json({message: "The user with the provided email doesn't exist"});
        }

        //Creating the reset token (to be sent via email)
        const resetToken=user.generatePasswordResetToken();
        await user.save({validateBeforeSave:false}); //the user that is reseting his password has a token that is secured and is in his database

        //Sending the token via email, (create a url with a message to be sent):
        const url = `${req.protocol}://${req.get("host")}/api/resetPassword/${resetToken}`;

        const msg= `Forgot your password? Reset it by visiting the following link: $(url)`;

        try{  //to send email, we need to test if this email has a problem
            await sendMail({
                email:user.email,
                subject:"Your password reset token is valid for 10 min",
                message: msg
            });

            res.status(200).json({status:"success",message:"The reset link was delivered to your email succesfully"});

        }catch(err){
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({validateBeforeSave:false}); //email wasn't sent maybe due to an internet problem
            res.status(500).json({message:"An error has occurred while sending the email, please try again in a moment"});
        }

    }catch(err){
        console.log(err);
    }
};

exports.resetPassword = async(req,res) => {
    try{
        const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const user = await User.findOne({
            passwordResettoken: hashedToken, 
            passwordResetExpires: {$gt: Date.now()}
        });
        if(!user){
            return res.status(400).json({message: "The token is invalid, or expired. Please request a new one"});
        }
        
        if(req.body.password.length < 8){
            return res.status(400).json({message: "The password's length is too short"});
        }
        
        if(req.body.password !== req.body.passwordConfirm){
            return res.status(400).json({message: "Passwords don't match."});
        }
        
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResettoken = undefined;
        user.passwordResetExpires = undefined;
        user.passwordChangedAt = Date.now();

        await user.save();

        res.status(200).json({message:"Password was changed successfully"})

    }catch(err){
        console.error(err);
    }
};

//protect function, that protects our route.
exports.protect = async (req,res,next) =>{
    try{
        //Checking if the token owner still exists
        //authorization:Bearer
        let token;
        
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({message:"You aren't logged in. Please login to get access"});

        }
        //Verifying the token (by decoding the token)
        let decoded;
        try{
            decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)

        }catch(error){
            if(error.name ==="JsonWebTokenError"){
                return res.status(401).json({message:"Invalid token, login again"});
            }
            else if(error.name === "TokenExpiredError"){
                return res.status(401).json({message: "Your session token has expired. Please login again"});
            }
        }

        //Checking if the token owner exist
        const currentUser = await User.findById(decoded.id);
        if(!currentUser){
            return res.status(401).json({message:"The user belonging to this session no longer exist"});
        }

        //Checking if the owner changed the password after the token was created
        if(currentUser.passwordChangedAfterTokenIssued(decoded.iat)){ //iat: time when token was issued //exp: time when the token will be expired           
            return res.status(401).json({message:"Your password has been changed! Please login again"});
        }

        //If everything is ok: ADD the user to all the requests (req.user = currentUser)
        req.user = currentUser;
        next();

    }catch(err){
        console.log(err);
    }

};
