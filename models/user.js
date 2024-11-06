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
    etat : {type: String, default:'en cours'},
    verificationToken: { type: String }, // Champ pour stocker le token de vérification
    resetPasswordToken: { type: String }, // Champ pour stocker le token de réinitialisation du mot de passe
    resetPasswordExpires: { type: Date } // Champ pour stocker la date d'expiration du token de réinitialisation
    }
  );
  
  const User = mongoose.model('User', userSchema);
  module.exports = User ;
  