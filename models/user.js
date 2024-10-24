const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    pseudo : {type:String , required:true},
    cin : {type:Number , required:true},
    email : {type:String , required:true},
    password : {type:String , required:true},
    }
  );
  
  const User = mongoose.model('User', userSchema);
  module.exports = User ;
