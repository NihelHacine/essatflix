const express = require("express");
const filmdirect = require("../models/filmdirect");
const filmdirectrouter = express.Router();

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
    let result = await filmdirect.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send({ msg: " filmdirect updated " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});
module.exports = filmdirectrouter;