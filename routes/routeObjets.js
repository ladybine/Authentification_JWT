const router = require("express").Router();
const user = require("../model/user");
const objet = require("../model/objet");
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  const objets = new objet({
    ...req.body,
  });
  objets
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});
router.get("/:id", (req, res, next) => {
  objet
    .findOne({ _id: req.params.id })
    .then((object) => res.status(200).json({ object }))
    .catch((error) => res.status(404).json({ error }));
});
router.put("/:id", (req, res, next) => {
  objet
    .updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "objet modifier!" }))
    .catch((error) => res.status(400).json({ error }));
});
router.delete("/:id", (req, res, next) => {
  objet
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "objet supprimer!" }))
    .catch((error) => res.status(400).json({ error }));
});

router.get("/", (req, res, next) => {
  // if(req.header)
  console.log(req.headers);
  const token = req.headers.authorization;
  jwt.verify(token, "barbine", (err) => {
    if (err) {
      res.status(401).json("Accès non authoriser");
    } else {
      objet
        .find()
        .then((objet) => res.status(200).json({ objet }))
        .catch((error) => res.status(400).json({ error }));
    }
  });
});

module.exports = router;
