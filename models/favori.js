const mongoose = require("mongoose");
const schema = mongoose.Schema;

const favoriSchema = new schema({
    film : {type:String , required:true},
    email_user : {type:String , required:true},

    }
  );
  
  const Favori = mongoose.model('Favori', favoriSchema);
  module.exports = Favori ;
