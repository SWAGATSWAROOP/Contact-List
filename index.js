const express = require("express");
const path = require("path");
const db = require("./config/mongoose.js");
const Contact = require("./models/contact.js");

const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

app.use((req, res, next) => {
  req.swagat = 1;
  console.log("Middleware1");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware2 ", req.swagat);
  next();
});

app.get("/", async (req, res) => {
  try {
    const users = await Contact.find().lean();
    return res.render("home", {
      title: "Practice",
      arr: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users.");
  }
});

function removeExtraSpaceInBetween(str) {
  return str.replace(/\s+/g, " ");
}

app.post("/add", async (req, res) => {
  try {
    req.body.name = req.body.name.trim();
    req.body.name = removeExtraSpaceInBetween(req.body.name);
    await Contact.create({
      name: req.body.name,
      phone: parseInt(req.body.phone),
    });
    console.log("Successfully Written");
    res.redirect("back");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding contact.");
  }
});

app.get("/delete", async (req, res) => {
  try {
    await Contact.findOneAndDelete({ _id: req.query.id });
    console.log("Successfully Deleted");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting contact.");
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log(`This is an error: ${err}`);
  }
  console.log(`Listening on port ${port}`);
});
