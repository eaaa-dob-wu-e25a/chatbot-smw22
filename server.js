import express from "express";
import responses from "./views/responses.js";
import {
  sanitizeMessageInput,
  sanitizeKeywordInput,
  sanitizeAnswerInput,
} from "./helpers/input-helpers.js";
import e from "express";

// Create an instance of express
const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "css" directory at the "/style" route
app.use(express.static("public"));

// Dette array gemmer alle chatbeskeder
const messages = [];

app.get("/", (req, res) => {
  res.render("index", { messages, botReply: "" });
});

app.post("/chat", (req, res) => {
  // Hent brugerens besked
  const inputMessage = req.body.message;

  // Sanitér input
  const userMessage = sanitizeMessageInput(req.body.message);

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
      // Tjek om temaet er "specific" til at matche med det præcist svar
      if (response.mode === "specific") {
        const exactMatch = response.answers.find(
          (ans) => ans.value === lowerMessage
        );
        if (exactMatch) {
          botReply = exactMatch.text;
          foundResponse = true;
          break;
        }
        for (let keyword of response.keywords) {
          if (lowerMessage.includes(keyword)) {
            const fallbackAnswer =
              response.answers.find((ans) => ans.mood === "friendly") ||
              response.answers[0];
            botReply = fallbackAnswer.text;
            foundResponse = true;
            break;
          }
        }
      } else {
        // Tjek om nogen keywords matcher og give et random svar
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
      }
      if (foundResponse) break;
    }

    // Hvis intet keyword matchede
    if (!foundResponse) {
      botReply = `Du skrev: "${userMessage}". Prøv at skrive "hej" eller "hjælp"!`;
    }

    // Gem beskederne kun hvis der ikke er fejl
    if (!error) {
      messages.push({
        sender: "Bruger",
        text: userMessage,
        time: new Date().toLocaleString("da-DK"),
        timestamp: new Date(),
      });
      messages.push({
        sender: "Bot",
        text: botReply,
        time: new Date().toLocaleString("da-DK"),
        timestamp: new Date(),
      });
    }
  }

  res.render("index", { messages, botReply, error });
});

app.post("/chat/clear", (req, res) => {
  messages.length = 0; // Tøm arrayet
  res.redirect("/"); // Redirect tilbage til hovedsiden
});

app.post("/add-response", (req, res) => {
  const keyword = sanitizeKeywordInput(req.body.keyword);
  const answer = sanitizeAnswerInput(req.body.answer);

  let responseError = "";
  let responseSuccess = "";

  if (!keyword || keyword.length < 2) {
    responseError = "Nøgleord skal være mindst 2 tegn og kun bogstaver!";
  } else if (!answer || answer.length < 6) {
    responseError = "Svaret skal være mindst 6 tegn!";
  } else if (keyword.length < 2) {
    responseError = "Nøgleord skal være mindst 2 tegn!";
  } else if (keyword.length > 50) {
    responseError = "Nøgleord må maksimalt være 50 tegn!";
  } else if (answer.length > 200) {
    responseError = "Svaret må maksimalt være 200 tegn!";
  } else if (keyword.includes(" ")) {
    responseError = "Nøgleord må ikke indeholde mellemrum!";
  } else {
    const lowerKeyword = keyword.toLowerCase();

    // Tjek for duplikat nøgleord
    for (let response of responses) {
      if (response.keywords.includes(lowerKeyword)) {
        responseError = "Dette nøgleord findes allerede!";
        break;
      }
    }

    if (!responseError) {
      responseSuccess = "Dit nøgleord og svar er blevet tilføjet!";
      responses.push({
        keywords: [lowerKeyword],
        answers: [answer],
      });
    }

    console.log(responses);
  }

  res.render("index", { responses, messages, responseSuccess, responseError });
});

// Listen on port 3000
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
