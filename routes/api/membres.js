const express = require("express");
const router = express.Router();

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
  next();
});

// Membre Model

// @route   GET api/membres
// @desc    Get All Membres
// @access  ..
router.get("/", async (req, res) => {
  sort_by = new Object(); //sort en fonction de la demande
  sort_by[req.query.sort_by] = +1;
  if (req.query.start_by != null) {
    console.log(`recherche filtrée par : ${req.query.start_by}`);
    await Membre.find({
      nom: { $regex: "^" + req.query.start_by }
    })
      .sort(sort_by)
      .exec(function(err, data) {
        // exec promise
        if (err) return res.status(500).send(err);
        return res.json(data);
      });
  } else {
    console.log("recherche non-filtrée");
    await Membre.find() //retourne un array avec tous les membres
      .sort(sort_by)
      .exec(function(err, data) {
        // exec promise
        if (err) return res.status(500).send(err);
        return res.json(data);
      });
  }
});

// @route   GET api/membres
// @desc    Get All Membres
// @access  Public
router.post("/", async (req, res) => {
  const newMembre = new Membre({
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    mail: req.body.mail,
    telephone: req.body.telephone,
    inscription: req.body.inscription,
    naissance: req.body.naissance,
    age: calculateAge(req.body.naissance),
    comite: req.body.comite
  });
  await newMembre.save().then(membre => res.json(membre));
});

// @route   GET api/membres
// @desc    Get All Membres
// @access  Public
router.delete("/:id", async (req, res) => {
  await Membre.findById(req.params.id).exec(async function(err, data) {
    try {
      await data.remove().then(() => res.json({ success: true }));
    } catch (err) {
      res.status(404).json({ error: "Cette id n'existe pas" });
    }
  });
});

router.put("/:id", async (req, res) => {
  await Membre.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function(err, data) {
      if (err) return res.status(500).send(err);
      return res.json(data);
    }
  );
});

router.get("/:id", async (req, res) => {
  await Membre.findById(req.params.id, function(err, data) {
    if (err) throw err;
    else res.json(data);
  });
});

module.exports = router;

function calculateAge(n) {
  const now = new Date();
  const naissance = new Date(n);
  if (now.getMonth() < naissance.getMonth()) {
    return (age = now.getFullYear() - naissance.getFullYear() - 1);
  }
  if (
    now.getMonth() == naissance.getMonth() ||
    now.getDate() < naissance.getDate()
  ) {
    return (age = now.getYear() - naissance.getYear() - 1);
  }
  return (age = now.getYear() - naissance.getYear());
}
