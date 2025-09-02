// Sanitering af input for at forhindre XSS
function sanitizeMessageInput(input) {
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

function sanitizeKeywordInput(input) {
  if (typeof input !== "string") return "";

  return input
    .replace(/[^\p{L}]/gu, "") // Fjerner alt undtagen bogstaver (Unicode \p{L} --> alle sprog ) (For at acceptere bogstaver i den danske alfabet)
    .replace(/javascript:/gi, "") // Fjerner javascript: links
    .replace(/script/gi, "") // Fjerner "script" ord
    .slice(0, 51) // Begræns længde til 51 tegn (længste danske ord)
    .replace(/on\w+=/gi, "") // Fjerner event handlers som onclick=
    .replace(" ", "") // Fjerner mellemrum
    .trim(); // Fjerner whitespace
}

function sanitizeAnswerInput(input) {
  if (typeof input !== "string") return "";

  return input
    .replace(/[<>]/g, "") // Fjerner < og > (forebygger HTML-tags)
    .replace(/["'`()]/g, "") // Fjerner potentielt farlige tegn
    .replace(/javascript:/gi, "") // Fjerner javascript: links
    .replace(/script/gi, "") // Fjerner "script" ord
    .slice(0, 200) // Begræns længde til 200 tegn
    .replace(/on\w+=/gi, "") // Fjerner event handlers som onclick=
    .trim(); // Fjerner whitespace i start og slut
}

export { sanitizeMessageInput, sanitizeKeywordInput, sanitizeAnswerInput };
