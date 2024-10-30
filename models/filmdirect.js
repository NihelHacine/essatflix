const mongoose = require("mongoose");
const schema = mongoose.Schema;

const filmdirectSchema = new schema({
    film : {type:String , required:true},
    video_id : {type:String , required:true},
    description : {type:String , required:true},
    start_hour : {type:Number , required:true},
    start_minute : {type:Number , required:true},
    year : {type:Number , required:true},
    day : {type:Number , required:true},
    month : {type:Number , required:true}
  
    }
  );
  
  const Filmdirect = mongoose.model('Filmdirect', filmdirectSchema);
  module.exports = Filmdirect ;
