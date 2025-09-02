function validateMessage(originalMessage, sanitizedMessage) {
  if (originalMessage !== sanitizedMessage) {
    return {
      isValid: false,
      error: "Ugyldigt input! Brug en anden tekst.",
      botReply: "Din besked indeholdt ugyldige tegn. Prøv igen!",
    };
  }
  if (!sanitizedMessage || sanitizedMessage.trim() === "") {
    return {
      isValid: false,
      error: "Du skal skrive en besked!",
      botReply: "Skriv en besked for at chatte!",
    };
  }
  if (sanitizedMessage.length < 2) {
    return {
      isValid: false,
      error: "Beskeden skal være mindst 2 tegn lang!",
      botReply: "Din besked er for kort. Prøv igen!",
    };
  }
  if (sanitizedMessage.length > 500) {
    return {
      isValid: false,
      error: "Beskeden er for lang (max 500 tegn)!",
      botReply: "Din besked er for lang. Prøv at gøre den kortere!",
    };
  }
  return {
    isValid: true,
    error: "",
    botReply: "",
  };
}

function validateResponse(keyword, answer) {
  if (!keyword || keyword.length < 2) {
    return {
      isValid: false,
      responseError: "Nøgleord skal være mindst 2 tegn og kun bogstaver!",
    };
  }
  if (!answer || answer.length < 6) {
    return {
      isValid: false,
      responseError: "Svaret skal være mindst 6 tegn!",
    };
  }
  if (keyword.length < 2) {
    return {
      isValid: false,
      responseError: "Nøgleord skal være mindst 2 tegn!",
    };
  }
  if (keyword.length > 50) {
    return {
      isValid: false,
      responseError: "Nøgleord må maksimalt være 50 tegn!",
    };
  }
  if (answer.length > 200) {
    return {
      isValid: false,
      responseError: "Svaret må maksimalt være 200 tegn!",
    };
  }
  if (keyword.includes(" ")) {
    return {
      isValid: false,
      responseError: "Nøgleord må ikke indeholde mellemrum!",
    };
  }
  return {
    isValid: true,
    responseError: "",
  };
}

export { validateMessage, validateResponse };
