const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios"); // Pour interagir avec ChatEngine
const userRouter = express.Router();
const { registerRules, loginRules, validation } = require("../middleware/validator");
const isAuth = require('../middleware/passport');

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
    const { pseudo, cin, email, password, secret_chat, classe, date_naissance, etat } = req.body;
    try {
        const newuser = new User({ pseudo, cin, email, password, secret_chat, classe, date_naissance, etat });

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
userRouter.put("/validate/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { etat: "accepté" },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ msg: "Utilisateur non trouvé" });
        }

        res.status(200).send({ msg: "Utilisateur validé avec succès", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Erreur lors de la validation de l'utilisateur" });
    }
});


module.exports = userRouter;
