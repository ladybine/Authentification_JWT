const express = require("express");
const app = express();
const mongoose = require("mongoose")

const routeObjet = require("./routes/routeObjets");
const routeUser = require("./routes/routeUser");

mongoose
  .connect(
    "mongodb+srv://barbine:barbine_iduma@cluster0.omjnknn.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());
app.use("/api/objets", routeObjet);
app.use("/user", routeUser)
app.listen("5000", console.log("le serveur est lancée"));
