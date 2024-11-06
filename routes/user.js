const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // Pour générer le token
const jwt = require("jsonwebtoken");
const axios = require("axios"); // Pour interagir avec ChatEngine
const userRouter = express.Router();
const { registerRules, loginRules, validation } = require("../middleware/validator");
const isAuth = require('../middleware/passport');
const sendEmail = require("../utils/SendEmail");
const verifyToken = require("../utils/verifyToken");

const sendResetPasswordEmail = require('../utils/sendResetPasswordEmail'); // Nouveau chemin



//get allusers
userRouter.get("/allusers", async (req, res) => {
    try {
      let result = await User.find();
      res.send({ users: result, msg: "all users " });
    } catch (error) {
      res.send({ msg: "fail" });
      console.log(error);
    }
  });

// Register new user
userRouter.post("/register", registerRules(), validation, async (req, res) => {
    const { pseudo, cin, email, password, secret_chat, classe, date_naissance, etat,verificationToken,resetPasswordToken,resetPasswordExpires } = req.body;
    try {
        const newuser = new User({ pseudo, cin, email, password, secret_chat, classe, date_naissance, etat, verificationToken,resetPasswordToken,resetPasswordExpires });

        // Hash password
        const salt = 10;
        const gensalt = await bcrypt.genSalt(salt);
        const hashedpassword = await bcrypt.hash(password, gensalt);
        newuser.password = hashedpassword;

        // Check if email exists
        const searcheduser = await User.findOne({ email });
        if (searcheduser) {
            return res.status(400).send({ msg: "Email already exists" });
        }

        // Save user in database
        const savedUser = await newuser.save();

        // Create user on ChatEngine
        try {
            await axios.post(
                'https://api.chatengine.io/users/',
                { username: pseudo, secret: secret_chat, first_name: pseudo },
                { headers: { 'Private-Key': process.env.CHAT_ENGINE_PRIVATE_KEY } }
            );
        } catch (error) {
            console.error("Error creating user on ChatEngine", error);
            return res.status(500).send({ msg: "Failed to create user on ChatEngine." });
        }

        // Return a success message without the token
        res.status(200).send({ user: savedUser, msg: "User registered successfully. Awaiting admin approval." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Cannot save the user" });
    }
});


// Login
userRouter.post("/login", loginRules(), validation, async (req, res) => {
    const { email, password } = req.body;
    try {
        const searcheduser = await User.findOne({ email });
        if (!searcheduser) {
            return res.status(400).send({ msg: "Verify your info" });
        }

        // Vérifie l'état de l'utilisateur
        if (searcheduser.etat === "en cours") {
            return res.status(403).send({ msg: "Votre profil n'a pas encore été accepté par l'admin." });
        }

        const match = await bcrypt.compare(password, searcheduser.password);
        if (!match) {
            return res.status(400).send({ msg: "Verify your info" });
        }

        const payload = {
            _id: searcheduser._id,
            pseudo: searcheduser.pseudo,
        };
        const token = await jwt.sign(payload, process.env.SecretOrKey);

        res.status(200).send({ user: searcheduser, msg: "Success", token: `Bearer ${token}` });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Cannot find the user" });
    }
});


// Get current user
userRouter.get("/current", isAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).send({ user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Cannot find the user" });
    }
});

// Update user
userRouter.put("/:_id", async (req, res) => {
    try {
        const { pseudo, email } = req.body;

        // Update user in MongoDB
        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.params._id },
            { $set: req.body },
            { new: true }
        );

        // Update user on ChatEngine if pseudo or email has changed
        if (pseudo || email) {
            await axios.patch(
                `https://api.chatengine.io/users/${req.params._id}/`,
                { username: pseudo, email },
                { headers: { 'Private-Key': process.env.CHAT_ENGINE_PRIVATE_KEY } }
            );
        }

        res.status(200).send({ updatedUser, msg: "User updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Error updating user" });
    }
});

// Delete user
userRouter.delete("/:_id", async (req, res) => {
    try {
        // Delete user from MongoDB
        const deletedUser = await User.findByIdAndDelete(req.params._id);
        if (!deletedUser) {
            return res.status(404).send({ msg: "User not found" });
        }

        // Delete user from ChatEngine
        await axios.delete(
            `https://api.chatengine.io/users/${req.params._id}/`,
            { headers: { 'Private-Key': process.env.CHAT_ENGINE_PRIVATE_KEY } }
        );

        res.status(200).send({ msg: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Error deleting user" });
    }
});

//update etat 
// Route pour valider un utilisateur
userRouter.put("/validate/:_id", async (req, res) => {
    try {
        // Recherche de l'utilisateur par son _id
        const user = await User.findById(req.params._id);

        if (!user) {
            return res.status(404).send({ msg: "Utilisateur non trouvé" });
        }

        // Génère un token de vérification
        const verificationToken = crypto.randomBytes(32).toString("hex");
        user.verificationToken = verificationToken;
        await user.save();

        // Envoie un email de vérification à l'utilisateur
        const verificationUrl = `${process.env.BASE_URL}/verify-email/${verificationToken}`;
        await sendEmail(
            user.email,
            "Vérifiez votre email",
            `Veuillez vérifier votre compte en cliquant sur ce lien : ${verificationUrl}`
        );

        res.status(200).send({ msg: "Email de vérification envoyé, utilisateur en attente de validation." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Erreur lors de la validation de l'utilisateur" });
    }
});


// Route pour vérifier l'email d'un utilisateur
userRouter.get('/verify-email/:token', async (req, res) => {
    const { token } = req.params;

    try {
        // Trouver l'utilisateur correspondant au token de vérification
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.redirect(`http://localhost:3000/?verification=failed`);
        }

        // Vérifie si l'état de l'utilisateur est "en cours"
        if (user.etat === "en cours") {
            // Mettre à jour l'état de l'utilisateur à "accepté"
            user.etat = "accepté";
            await user.save(); // Sauvegarde les changements
        }

        // Redirige vers la page d'authentification avec un message de succès
        res.redirect(`http://localhost:3000/?verification=success`);
    } catch (error) {
        console.error("Erreur lors de la vérification de l'email:", error);
        res.redirect(`http://localhost:3000/?verification=failed`);
    }
});


// Route pour demander la réinitialisation du mot de passe
userRouter.post('/request-password-reset', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Cet email n'est pas enregistré." });
        }

        // Générer le token de réinitialisation de mot de passe
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Enregistrer le token et la date d'expiration dans l'utilisateur
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 heure
        await user.save();

        await sendResetPasswordEmail(user.email, resetToken);

        return res.status(200).json({ msg: "Un email de réinitialisation a été envoyé." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Une erreur est survenue lors de l'envoi de l'email." });
    }
});

// Route pour réinitialiser le mot de passe
userRouter.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Trouver l'utilisateur avec le token
        const user = await User.findOne({ resetPasswordToken: token });

        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur non trouvé ou token invalide.' });
        }

        // Vérifiez si le token de réinitialisation n'est pas expiré
        if (Date.now() > user.resetPasswordExpires) {
            return res.status(401).json({ msg: 'Token expiré. Veuillez demander une nouvelle réinitialisation.' });
        }

        // Hachez le nouveau mot de passe
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Réinitialiser le token et l'expiration
        user.resetPasswordToken = undefined; // Supprime le token après utilisation
        user.resetPasswordExpires = undefined; // Supprime la date d'expiration après utilisation

        await user.save();

        res.status(200).json({ msg: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erreur lors de la réinitialisation du mot de passe' });
    }
});





// Route pour réinitialiser le mot de passe
// Route pour réinitialiser le mot de passe
userRouter.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Vérifiez le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // Assurez-vous que l'ID est dans le payload du token

        // Vérifiez si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur non trouvé' });
        }

        // Hachez le nouveau mot de passe
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ msg: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erreur lors de la réinitialisation du mot de passe' });
    }
});



module.exports = userRouter;
