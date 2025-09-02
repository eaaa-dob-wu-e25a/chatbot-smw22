import express from "express";
import { chatLogic } from "./controllers/chatLogic.js";
import { addResponse } from "./controllers/responseLogic.js";

// Create an instance of express
const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "css" directory at the "/style" route
app.use(express.static("public"));

// Vis hovedsiden med chatten
app.get("/", (req, res) => {
  res.render("index", { messages, botReply: "" });
});

// Håndter chat-beskeder
app.post("/chat", chatLogic);

// Håndter rydning af chat-historik
app.post("/chat/clear", (req, res) => {
  messages.length = 0;
  res.redirect("/"); // Redirect tilbage til hovedsiden
});

// Håndter tilføjelse af nye nøgleord og svar
app.post("/add-response", addResponse);

// Listen on port 3000
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
