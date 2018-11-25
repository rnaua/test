const express = require("express");
const router = express.Router();

const Cotisation = require("../../models/cotisation");
const Membre = require("../../models/membre");

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next(); //accepter tous les types de requêtes  + Header
});

// Cotisation Model

//@route    GET api/cotisations
//@desc     GET all cotisations
//@access   ..

router.get("/", async (req, res) => {
  console.log("GET REQUEST");
  await Cotisation.find()
    .populate("membre")
    .exec(function(err, data) {
      if (err) return res.status(500).send(err);
      return res.json(data);
    });
});

router.post("/", async (req, res) => {
  console.log("annee :" + req.body.annee);
  console.log("montant :" + req.body.montant);
  await Membre.find({}).exec(
    async function(err, membres) {
      if (err) return res.status(500).send(err);
      for (x = 0; x < membres.length; x++) {
        let newCotisation = new Cotisation({
          annee: req.body.annee,
          montant: req.body.montant,
          statut: false,
          membre: membres[x]._id
        });
        await newCotisation.save();
      }
      res.status(201).end();

      /*let newCotisation = new Cotisation({
        annee: req.body.annee,
        montant: req.body.montant,
        statut: false,
        membreID: membre._id
      });
      newCotisation.save().then(cotisation => res.json(cotisation));*/
    }
    //await ne marche pas ..
  );
});

module.exports = router;
