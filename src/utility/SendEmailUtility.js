const nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 25,
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.PASSWORD_SEND_EMAIL,
        }
    });

 
    let mailOptions = {
        from: process.env.FROM_EMAIL,
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    
   return  await transporter.sendMail(mailOptions)

}
module.exports=SendEmailUtility