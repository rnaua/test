const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const db = require("../config/keys").mongoURI;

//create schema
const MembreSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  naissance: {
    type: Date,
    required: true
  },
  age: {
    type: Number
  },
  adresse: {
    type: String,
    required: true
  },
  telephone: {
    type: String
  },
  mail: {
    type: String
  },
  inscription: {
    type: Date,
    default: Date.now
  },
  comite: {
    type: Boolean,
    default: 0
  }
});
module.exports = Membre = mongoose.model("membre", MembreSchema);
