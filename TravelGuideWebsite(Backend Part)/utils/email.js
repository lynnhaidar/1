const nodemailer=require('nodemailer');

exports.sendMail = async(options) =>{ //options is an object
    //Transporter(email goes from nodejs server to user)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    //Defining the mail options:
    const mailOptions = {
        from: "Lynn Haidar <example@travelapi.com>",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    //Send the mail
    await transporter.sendMail(mailOptions);

};