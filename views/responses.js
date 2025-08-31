//Chatbot responses
const responses = [
  // Greetings
  {
    mode: "specific",
    keywords: ["tak", "mange tak", "tusind tak"],
    answers: [
      { value: "tak", text: "Det var så lidt.", mood: "normal" },
      {
        value: "mange tak",
        text: "Jeg er altid her for at hjælpe 😄",
        mood: "friendly",
      },
      { value: "tusind tak", text: "Ingen problem! 😁", mood: "cool" },
    ],
  },
  {
    keywords: ["hej", "hello", "hi"],
    answers: [
      "Hej med dig! 😄",
      "Hello there! 🤙",
      "Hej! Hvad kan jeg hjælpe med? 🤞",
    ],
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

export default responses;
