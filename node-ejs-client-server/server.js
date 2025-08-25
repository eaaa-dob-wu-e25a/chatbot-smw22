// Import express framework
import express from "express";

// Create an instance of express
const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// names array
const names = [];

// GET - render the index page
app.get("/", (req, res) => {
  res.render("index", { name: "", age: "", error: "", names });
});

// POST - handle form submission
app.post("/submit", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  let error = "";
  if (!name || (name.trim() === "" && !age) || age.trim() === "") {
    error = "Du skal indtaste et navn eller alder!";
  } else {
    names.push(name);
  }
  res.render("index", { name, age, error, names });
});

// Listen on port 3000
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
