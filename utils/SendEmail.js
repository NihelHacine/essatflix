const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL, // Votre email
            pass: process.env.EMAIL_PASSWORD, // Votre mot de passe ou app password
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        text,
    });
};

module.exports = sendEmail;
