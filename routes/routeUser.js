const router = require("express").Router();
const user = require("../model/user");
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  const users = new user({ ...req.body });
  users
    .save()
    .then(() => res.status(200).json("utilisateur enregistré"))
    .catch((error) => res.status(404).json({ error }));
});
router.post("/login", (req, res, next) => {
  user
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(404).json("adress mail incorrect");
      } else {
        // res.status(200).json(user)
        if (req.body.password == user.password) {
          const payload = { id: user._id, email: user.email };
          const token = jwt.sign(payload, "barbine", { expiresIn: "24h" });

          res.status(200).json(token);
        } else {
          res.status(401).json("mots de passe incorrect");
        }
      }
      // res.status(200).json(user)
    })
    .catch((error) => res.jsonp({ error }));
});
router.get("/", (req, res, next) => {
  user
    .find()
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
});

module.exports = router;
