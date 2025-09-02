import { sanitizeMessageInput } from "../helpers/input-sanitators.js";
import { validateMessage } from "../helpers/input-validators.js";
import responses from "../data/responses.js";
import { messages } from "../data/messages.js";

function chatLogic(req, res) {
  // Sanitér input
  const originalMessage = req.body.message;
  const userMessage = sanitizeMessageInput(originalMessage);

  let botReply = "";
  let error = "";

  // Validér input
  const validatedMessage = validateMessage(originalMessage, userMessage);

  if (!validatedMessage.isValid) {
    error = validatedMessage.error;
    botReply = validatedMessage.botReply;
  } else {
    // Smart svar-logik med arrays og objekter
    const lowerMessage = userMessage.toLowerCase();
    let foundResponse = false;

    let matchedCategory = "ukendt";

    // Find match og gem kategori
    responses.forEach((resp) => {
      if (resp.keywords.some((keyword) => userMessage.includes(keyword))) {
        const randomIndex = Math.floor(Math.random() * resp.answers.length);
        botReply = resp.answers[randomIndex];
        matchedCategory = resp.category;
      }
    });

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

    // Begræns beskedhistorikken til de sidste 10 beskeder
    // if (messages.length > 10) messages.shift();

    // statisk visning af antal beskeder i chatten
    // const totalMessages = messages.length;
    // <p>Antal beskeder i chatten: <%= totalMessages %></p> (i template)

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
        category: matchedCategory,
      });
    }
  }

  res.render("index", { messages, botReply, error });
}

export { chatLogic };
