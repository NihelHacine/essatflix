const nodemailer = require("nodemailer");

const sendResetPasswordEmail = async (to, resetToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL, // Votre email
            pass: process.env.EMAIL_PASSWORD, // Votre mot de passe ou app password
        },
    });

    const subject = 'Réinitialisation de votre mot de passe';
    const text = `Cliquez sur ce lien pour réinitialiser votre mot de passe : http://localhost:3000/reset-password/${resetToken}`;

    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        text,
    });
};

module.exports = sendResetPasswordEmail;