// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // ou le service de ton choix
    auth: {
        user: process.env.EMAIL, // Ton adresse email
        pass: process.env.EMAIL_PASSWORD // Ton mot de passe
    }
});

const sendAnnonce = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erreur lors de l\'envoi de l\'email:', error);
        } else {
            console.log('Email envoyé:', info.response);
        }
    });
};

module.exports =  sendAnnonce ;
