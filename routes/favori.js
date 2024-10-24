const express = require("express");
const favori = require("../models/favori");
const favorirouter = express.Router();

// add favori
// POST method
favorirouter.post("/addfavori", async (req, res) => {
  try {
    let newfavori = new favori({ ...req.body });
    let result = await newfavori.save();
    res.send({ favori: result, msg: "successfully added" });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});

// lister favoris
// Get method
favorirouter.get("/allfavori", async (req, res) => {
  try {
    let result = await favori.find();
    res.send({ favori: result, msg: "all favoris " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});

// delete favori
// Delete method
favorirouter.delete("/:id", async (req, res) => {
  try {
    let result = await favori.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "favori deleted " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});


module.exports = favorirouter;