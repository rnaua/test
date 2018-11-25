const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const db = require("../config/keys").mongoURI;

//create schema
const CotisationSchema = new Schema({
  annee: { type: Number, required: false },
  montant: { type: Number, required: false },
  statut: { type: Boolean },
  membre: { type: Schema.Types.ObjectId, ref: "membre" }
});
module.exports = Cotisation = mongoose.model("cotisation", CotisationSchema);
