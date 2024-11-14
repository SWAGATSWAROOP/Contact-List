const express = require("express");
//Importing the path
const path = require("path");

//Connection of the database
const db = require("./config/mongoose.js");
const port = process.env.port || 3000;
let app = express();

//Providing Schema with model
const Contact = require("./models/contact.js");

//Setting view engine and directory for views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//Middleware for accessing the urls
app.use(express.urlencoded());

//Middleware for including css/js files
app.use(express.static("assets"));

//Some of the midlleware
app.use((req, res, next) => {
  req.swagat = 1;
  console.log("Middleware1");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware2 ", req.swagat);
  next();
});

//Receiving the get request
app.get("/", (req, res) => {
  async function retrieveUsers() {
    try {
      const users = await Contact.find().lean(); // Add .lean() to convert to JSON
      return res.render("home", {
        title: "Practice",
        arr: users,
      });
    } catch (error) {
      console.error(error.name);
    }
  }
  retrieveUsers();
});

function removeExtraSpaceInBetween(str) {
  return str.replace(/\s+/g, " ");
}

app.post("/add", (req, res) => {
  req.body.name = req.body.name.trim();
  req.body.name = removeExtraSpaceInBetween(req.body.name);
  Contact.create({
    name: req.body.name,
    phone: parseInt(req.body.phone),
  });
  console.log("Succesfully Written");
  return res.redirect("back");
});

app.get("/delete", (req, res) => {
  async function deleteusers() {
    try {
      await Contact.findOneAndDelete(req.params.id);
    } catch (error) {
      console.log(error.name);
    }
  }
  deleteusers();
  res.redirect("/");
});

//Listening
app.listen(port, (err) => {
  if (err) {
    console.log(`This is an error ${err.name}`);
  }
  console.log(`Listening on port ${port}`);
});
