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

export { sanitizeInput };
