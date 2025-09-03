//Chatbot responses
const responses = [
  // Tak
  {
    category: "tak",
    mode: "specific",
    keywords: ["tak", "mange tak", "tusind tak"],
    answers: [
      { value: "tak", text: "Det var så lidt.", mood: "normal" },
      {
        value: "mange tak",
        text: "Jeg er altid her for at hjælpe! 😄",
        mood: "friendly",
      },
      { value: "tusind tak", text: "Ingen problem! 😁", mood: "cool" },
    ],
  },
  // Rejser og steder
  {
    category: "rejser",
    keywords: ["rejse", "ferie", "by", "land", "hotel", "strand", "tur"],
    answers: [
      "Rejser åbner verden! Hvilket land vil du helst besøge?",
      "Ferie er dejligt – foretrækker du strand eller storby?",
      "Jeg drømmer ofte om at udforske nye steder gennem dine historier!",
      "Har du en yndlingsdestination?",
      "At rejse er at leve – sagde H.C. Andersen engang! 🌍✈️",
    ],
  },
  {
    category: "mad",
    keywords: ["mad", "spise", "restaurant", "ret", "køkken", "måltid"],
    answers: [
      "Mad er livets krydderi! Hvad er din yndlingsret?",
      "Jeg elsker at høre om mad! Hvad kan du bedst lide?",
      "Er du mere til sødt eller salt?",
      "Hvilket køkken er din favorit – italiensk, mexisk, asiatisk?",
      "Mad bringer folk sammen – har du en favorit restaurant?",
    ],
  },
  // Dyr
  {
    category: "dyr",
    keywords: ["hund", "kat", "dyr", "fugl", "kanin", "kæledyr"],
    answers: [
      "Dyr giver så meget glæde! Har du et kæledyr?",
      "Katte og hunde er de klassiske favoritter. Hvad foretrækker du?",
      "Jeg elsker at høre om folks kæledyr! Fortæl mig mere 🐶🐱",
      "Dyr er virkelig gode venner – også selvom jeg kun kan chatte 😉",
      "Hvis jeg kunne, ville jeg have en digital hund!",
    ],
  },
  // Skole og arbejde
  {
    category: "arbejde",
    keywords: ["skole", "arbejde", "studie", "lære", "opgave", "job"],
    answers: [
      "Det lyder som du har travlt! Er det spændende?",
      "Skole og arbejde kan være hårdt – men også givende!",
      "Hvad arbejder eller studerer du med?",
      "Læring er en livslang rejse. Hvad er dit næste mål?",
      "Jeg kan hjælpe med motivation – bare spørg! 💪",
    ],
  },
  // Teknologi
  {
    category: "teknologi",
    keywords: ["computer", "internet", "telefon", "teknologi", "AI", "robot"],
    answers: [
      "Teknologi udvikler sig hurtigt – spændende, ikke?",
      "Jeg er jo selv en chatbot – en slags teknologi 😅",
      "Hvilken app eller gadget kan du ikke leve uden?",
      "Synes du teknologi gør livet nemmere eller sværere?",
      "AI og robotter kan være skræmmende – men også fascinerende!",
    ],
  },
  // Humor og sjov
  {
    category: "humor",
    keywords: ["joke", "vittighed", "sjov", "grine", "latter"],
    answers: [
      "Vil du høre en lille joke? 😄",
      "Humor er den bedste medicin! Hvad får dig altid til at grine?",
      "Jeg kan ikke grine højt, men jeg elsker sjove historier!",
      "Har du en yndlingsvittighed?",
      "Lad os sprede lidt glæde – fortæl mig en joke!",
    ],
  },
  // Søvn og afslapning
  {
    category: "søvn",
    keywords: ["sove", "træt", "søvn", "slappe af", "hvile"],
    answers: [
      "Søvn er så vigtigt for kroppen! Får du nok?",
      "Det er dejligt at kunne slappe af efter en lang dag.",
      "Har du en god rutine for at falde i søvn?",
      "Jeg behøver ikke sove, jeg kan chatte hele natten 😴🤖",
      "Hvile er en superkraft, mange glemmer at bruge!",
    ],
  },
  // Fremtid og drømme
  {
    category: "fremtid",
    keywords: ["drøm", "fremtid", "mål", "plan", "ønske"],
    answers: [
      "Det er spændende at tænke på fremtiden! Hvad drømmer du om?",
      "Har du nogle store mål du arbejder hen imod?",
      "Jeg elsker at høre om folks visioner – hvad er din?",
      "Drømme kan blive til virkelighed, hvis man tør!",
      "Hvad ønsker du dig mest lige nu?",
    ],
  },
  // Musik
  {
    category: "musik",
    keywords: ["musik", "sang", "lytte", "band", "koncert", "melodi"],
    answers: [
      "Musik kan virkelig ændre stemningen! Hvad lytter du mest til?",
      "Har du et yndlingsband eller en yndlingssang?",
      "Jeg kan ikke synge, men jeg elsker at høre om musiksmag 🎶",
      "Har du været til en fed koncert for nylig?",
      "Musik er universelt – alle har noget de kan lide!",
    ],
  },
  // Sport
  {
    category: "sport",
    keywords: ["sport", "fodbold", "løb", "basketball", "træning", "fitness"],
    answers: [
      "Sport holder kroppen sund og stærk! Dyrker du noget sport?",
      "Fodbold er populært – har du et yndlingshold?",
      "Træning kan være hårdt, men føles godt bagefter 💪",
      "Hvilken sport synes du er sjovest at følge?",
      "Jeg kan ikke spille sport, men jeg hepper gerne på dig!",
    ],
  },
  // Sundhed
  {
    category: "sundhed",
    keywords: ["sundhed", "kost", "træning", "energi", "meditere", "motion"],
    answers: [
      "At passe på sin krop er super vigtigt! Hvordan gør du?",
      "Sundhed handler både om krop og sind 🧘",
      "Har du en favorit sund vane?",
      "Balance er nøglen – både grøntsager og lidt chokolade 😉",
      "Jeg kan ikke spise sundt, men jeg kan heppe på dig!",
    ],
  },
  // Venskab
  {
    category: "venskab",
    keywords: ["ven", "venner", "venskab", "kammerat", "fællesskab"],
    answers: [
      "Venner gør livet meget bedre 💙 Har du en bedste ven?",
      "Venskab handler om tillid og glæde.",
      "Har du oplevet noget sjovt med dine venner for nylig?",
      "Nye venskaber kan opstå de mest uventede steder!",
      "Jeg vil gerne være din chat-ven! 🤗",
    ],
  },
  // Tid og dage
  {
    category: "tid",
    keywords: ["tid", "dato", "uge", "måned", "år", "dag", "kalender"],
    answers: [
      "Tiden flyver, når man hygger sig ⏳",
      "Har du nogle planer for ugen?",
      "Hvilken måned er din favorit?",
      "Et nyt år betyder nye muligheder!",
      "Hver dag er en frisk start – også i dag!",
    ],
  },
  // Livsfilosofi
  {
    category: "filosofi",
    keywords: ["liv", "mening", "lykke", "kærlighed", "eksistens", "filosofi"],
    answers: [
      "Livets mening kan være forskellig for alle – hvad er din?",
      "Lykke findes ofte i de små ting 💫",
      "Kærlighed gør livet rigt og smukt ❤️",
      "Filosofi er spændende – har du en yndlingstænker?",
      "Jeg tror livet handler om at lære og dele.",
    ],
  },
  // Hilsner
  {
    category: "hilsen",
    keywords: ["hej", "hello", "hi", "hejsa", "goddag"],
    answers: [
      "Hej med dig! 😄",
      "Hello there! 🤙",
      "Hej! Hvad kan jeg hjælpe med? 🤞",
      "Hej! Hvordan har du det i dag?",
      "Hello! Dejligt at møde dig!",
      "Hey! Velkommen til chatten!",
    ],
  },
  // Spørgsmål om velbefindende
  {
    category: "velbefindende",
    keywords: ["hvordan går det", "hvordan har du det"],
    answers: ["Jeg har det fint, tak! 😊", "Det går godt med mig! 😁"],
  },
  // Farvel
  {
    category: "farvel",
    keywords: ["farvel", "bye", "ses"],
    answers: ["Farvel! 👋", "Vi ses! 👋", "Tak for snakken! 👋"],
  },
  // Hjælp
  {
    category: "hjælp",
    keywords: ["hjælp", "help"],
    answers: [
      "Jeg kan hjælpe dig med at chatte! 💬",
      "Spørg mig om hvad som helst! 💬",
    ],
  },
];

export default responses;
