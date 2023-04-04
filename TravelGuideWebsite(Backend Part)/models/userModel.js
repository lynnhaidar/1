const mongoose = require ('mongoose');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: [true,'Please enter your full name'],
        minLength: 5,
        trim:true,
    },

    username:{
        type: String,
        unique:true,
        required: [true,'Please enter your username'],
        minLength:5,
        maxLength:12,
        trim:true,
    },

    email:{
        type: String,
        unique:true,
        trim:true,
        lowercase:true
    },

    password:{
        type: String,
        minLength: 8,
        maxLength:30,
        trim: true,
    },

    passwordConfirm:{
        type: String,
        minLength: 8,
        maxLength:30,
        trim: true,
        
    },

    phonenumber:{
        type: String,
        minLength: 6,
        required: true,
    },

    passwordChangedAt: Date, //added these 3 lines after installing package npm install nodemailer
    passwordResetToken:String, //to be sent by email
    passwordResetExpires:Date,

},
    { timestamps:true }

);

//Automated function, it runs w/out calling it
userSchema.pre("save", async function(next){
    try{
        if(!this.isModified("password")){
            return next(); //go to next statement
        }
        //else ismodified -> encrypt it
        this.password = await bcrypt.hash(this.password,12); //12 is max number we can give
        this.passwordConfirm = undefined; //keep passwordconfirm but isn't stored in db, and after making sure that password is hashed
    }catch(err){
        console.log(err);
    }

});

userSchema.methods.checkPassword = async function ( //returns whether it's true or false
    personPassword, //Coming from the frontend as a plaintext(to be entered by the person)
    userPassword //Coming from the database as a hashed value  (ORDER IS IMP)
)

{
    return await bcrypt.compare(personPassword,userPassword);
};

//This function will create a random reset token
userSchema.methods.generatePasswordResetToken = function () {
    //randomize to not be duplicated, or used more than once
    const resetToken=crypto.randomBytes(32).toString("hex"); //will be sent via email

    //saved in the database in a hashed way
    this.passwordResetToken = crypto.createHash("sha256").update("resetToken").digest("hex");

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000 //in milliseconds, 10 min after now of validity
    return resetToken;
};

module.exports = mongoose.model("User",userSchema);
