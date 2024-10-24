const mongoose = require("mongoose");
const schema = mongoose.Schema;

const filmSchema = new schema({
    film : {type:String , required:true},
    gender : {type:String , required:true},
    year : {type:String , required:true},
    description : {type:String , required:true},
    photo : {type:String , required:true},
    video : {type:String , required:true},
    add_date : {type:Date,required:true},
    }
  );
  
  const Film = mongoose.model('Film', filmSchema);
  module.exports = Film ;
