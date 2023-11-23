const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
const custModel = require("./models/Customers.js");
const config = require("./config/config.js");
const petModel = require("./models/pet.js");
app.use(express.json());
mongoose.connect(
  config.DB
).then(
  console.log("DB Connected")
);
app.listen(3001, () => {
  console.log("Server is Running");
});
app.post("/register", (req, res) => {
  if (custModel.findOne)
    custModel
      .create(req.body)
      .then((customers) => res.json(customers))
      .catch((err) => res.json(err));
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  custModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {

        console.log("success");
        res.json({ user, success: true });
      } else {

        console.log("incorrect pass");
        res.json("incorrect pass");
      }
    } else {
      console.log("norecord");
      res.json("no record exist");
    }
  });
});
app.post("/lost", (req, res) => {
  const { petname, date, desc, city } = req.body;
  petModel.create(req.body).then((pets) => res.json(pets)).catch
    ((err) => res.json(err));
});
app.get('/pets', async (req, res) => {
  try {
    const pets = await petModel.find();
    res.json(pets);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
