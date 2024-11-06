const express = require("express");
const filmdirect = require("../models/filmdirect");
const User = require("../models/user");
const filmdirectrouter = express.Router();
const sendAnnonce = require('../utils/sendAnnonce')

// add filmdirect
// POST method
filmdirectrouter.post("/addfilmdirect", async (req, res) => {
  try {
    let newfilmdirect = new filmdirect({ ...req.body });
    let result = await newfilmdirect.save();
    res.send({ filmdirect: result, msg: "successfully added" });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});

// lister films
// Get method
filmdirectrouter.get("/allfilmdirect", async (req, res) => {
  try {
    let result = await filmdirect.find();
    res.send({ filmdirect: result, msg: "all filmdirect " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});

// delete film
// Delete method
filmdirectrouter.delete("/:id", async (req, res) => {
  try {
    let result = await filmdirect.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "filmdirect deleted " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});

// update forum
// update method
filmdirectrouter.put("/:id", async (req, res) => {
  try {
    // Log de l'ID du film et des données envoyées
    console.log("Updating film with ID:", req.params.id, "Data:", req.body);
    
    // Met à jour le film dans la base de données
    const Filmdirect = await filmdirect.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true } // Retourne le film mis à jour
    );

    // Si le film n'est pas trouvé
    if (!Filmdirect) {
      return res.status(404).send({ msg: "Film not found" });
    }

    // Récupérer tous les utilisateurs pour envoyer l'email
    const users = await User.find();
    const emailList = users.map(user => user.email).join(', ');

    // Récupérer le nom du film et la date de diffusion
    const filmTitle = Filmdirect.film; // Utilisation du bon modèle
    const year = Filmdirect.year;
    const month = Filmdirect.month;
    const day = Filmdirect.day;
    const releaseDate = `${day}/${month}/${year}`;

    // Envoyer un email à tous les utilisateurs
    const subject = `Annonce de la disponibilité du film: ${filmTitle}`;
    const text = `Le film "${filmTitle}" sera disponible en direct sur notre plateforme le ${releaseDate}. Ne manquez pas le rendez-vous !`;

    await sendAnnonce(emailList, subject, text);

    res.send({ msg: "Film updated and notification sent" });
  } catch (error) {
    console.error("Error occurred:", error); // Log de l'erreur
    res.status(500).send({ msg: "Internal Server Error" });
  }
});
module.exports = filmdirectrouter;