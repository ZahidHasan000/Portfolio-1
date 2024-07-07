const nodemailer = require("nodemailer");

// Receive a userMessage
const sendMail = async (text) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth: {
            user: process.env.SMPT_USER,
            pass: process.env.SMPT_PASSWORD
        }
    });

    await transporter.sendMail({
        subject: "Contact request from portfolio",
        to: process.env.MY_MAIL_B,
        from: process.env.MY_MAIL_B,
        text
    });
};

module.exports = sendMail;



