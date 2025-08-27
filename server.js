// Import express framework
import express from "express";

// Create an instance of express
const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "css" directory at the "/style" route
app.use(express.static("public"));

//Chatbot responses
const responses = [
  {
    keywords: ["hej", "hello", "hi"],
    answers: ["Hej med dig! 😄", "Hello there! 🤙", "Hej! Hvordan går det? 🤞"],
  },
  {
    keywords: ["hvordan går det", "hvordan har du det"],
    answers: ["Jeg har det fint, tak! 😊", "Det går godt med mig! 😁"],
  },
  {
    keywords: ["farvel", "bye", "ses"],
    answers: ["Farvel! 👋", "Vi ses! 👋", "Tak for snakken! 👋"],
  },
  {
    keywords: ["hjælp", "help"],
    answers: [
      "Jeg kan hjælpe dig med at chatte! 💬",
      "Spørg mig om hvad som helst! 💬",
    ],
  },
];

// Dette array gemmer alle chatbeskeder
const messages = [];

// Sanitering af input for at forhindre XSS
function sanitizeInput(input) {
  if (typeof input !== "string") return "";

  return input
    .replace(/[<>]/g, "") // Fjerner < og > (forebygger HTML-tags)
    .replace(/["'`()]/g, "") // Fjerner potentielt farlige tegn
    .replace(/javascript:/gi, "") // Fjerner javascript: links
    .replace(/script/gi, "") // Fjerner "script" ord
    .slice(0, 500) // Begræns længde til 500 tegn
    .replace(/on\w+=/gi, "") // Fjerner event handlers som onclick=
    .trim(); // Fjerner whitespace i start og slut
}

app.get("/", (req, res) => {
  res.render("index", { messages, botReply: "" });
});

app.post("/chat", (req, res) => {
  // Hent brugerens besked
  const inputMessage = req.body.message;

  // Sanitér input
  const userMessage = sanitizeInput(req.body.message);

  let botReply = "";
  let error = "";

  // Validér input
  if (inputMessage !== userMessage) {
    error = "Ugyldigt input! Brug en anden tekst.";
    botReply = "Din besked indeholdt ugyldige tegn. Prøv igen!";
  } else if (!userMessage || userMessage.trim() === "") {
    error = "Du skal skrive en besked!";
    botReply = "Skriv en besked for at chatte!";
  } else if (userMessage.length < 2) {
    error = "Beskeden skal være mindst 2 tegn lang!";
    botReply = "Din besked er for kort. Prøv igen!";
  } else if (userMessage.length > 500) {
    error = "Beskeden er for lang (max 500 tegn)!";
    botReply = "Din besked er for lang. Prøv at gøre den kortere!";
  } else {
    // Smart svar-logik med arrays og objekter
    const lowerMessage = userMessage.toLowerCase();
    let foundResponse = false;

    // Loop gennem alle response objekter
    for (let response of responses) {
      // Tjek om nogen keywords matcher
      for (let keyword of response.keywords) {
        if (lowerMessage.includes(keyword)) {
          // Vælg et tilfældigt svar fra answers array
          const randomIndex = Math.floor(
            Math.random() * response.answers.length
          );
          botReply = response.answers[randomIndex];
          foundResponse = true;
          break;
        }
      }
      if (foundResponse) break;
    }

    // Hvis intet keyword matchede
    if (!foundResponse) {
      botReply = `Du skrev: "${userMessage}". Prøv at skrive "hej" eller "hjælp"!`;
    }

    // Gem beskederne kun hvis der ikke er fejl
    if (!error) {
      messages.push({ sender: "Bruger", text: userMessage });
      messages.push({ sender: "Bot", text: botReply });
    }
  }

  res.render("index", { messages, botReply, error });
});

app.post("/chat/clear", (req, res) => {
  messages.length = 0; // Tøm arrayet
  res.redirect("/"); // Redirect tilbage til hovedsiden
});

// Listen on port 3000
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
