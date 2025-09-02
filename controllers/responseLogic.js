import {
  sanitizeKeywordInput,
  sanitizeAnswerInput,
} from "../helpers/input-sanitators.js";
import { validateResponse } from "../helpers/input-validators.js";
import responses from "../data/responses.js";
import { messages } from "../data/messages.js";

function addResponse(req, res) {
  const keyword = sanitizeKeywordInput(req.body.keyword);
  const answer = sanitizeAnswerInput(req.body.answer);

  let responseError = "";
  let responseSuccess = "";

  const validatedResponse = validateResponse(keyword, answer);

  // Validér input
  if (!validatedResponse.isValid) {
    responseError = validatedResponse.responseError;
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
  }

  res.render("index", { responses, messages, responseSuccess, responseError });
}

export { addResponse };
