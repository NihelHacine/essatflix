const express = require("express");
const film = require("../models/film");
const filmrouter = express.Router();

// add film
// POST method
filmrouter.post("/addfilm", async (req, res) => {
  try {
    let newfilm = new film({ ...req.body });
    let result = await newfilm.save();
    res.send({ film: result, msg: "successfully added" });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});

// lister films
// Get method
filmrouter.get("/allfilm", async (req, res) => {
  try {
    let result = await film.find();
    res.send({ film: result, msg: "all films " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});

// delete film
// Delete method
filmrouter.delete("/:id", async (req, res) => {
  try {
    let result = await film.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "film deleted " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});

// update forum
// update method
filmrouter.put("/:id", async (req, res) => {
  try {
    let result = await film.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send({ msg: " film updated " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});
module.exports = filmrouter;