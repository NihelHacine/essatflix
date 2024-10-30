const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    pseudo : {type:String , required:true},
    cin : {type:Number , required:true},
    email : {type:String , required:true},
    password : {type:String , required:true},
    secret_chat : {type:String, required:true},
    classe : {type:String, required: true},
    date_naissance : {type:String, required:true},
    etat : {type: String, default:'en cours'}
    }
  );
  
  const User = mongoose.model('User', userSchema);
  module.exports = User ;
  