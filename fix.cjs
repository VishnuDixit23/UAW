const fs = require('fs');
const file = 'src/pages/Gallery.jsx';
let content = fs.readFileSync(file, 'utf8');

// Find the index of girls-hygiene
const startIdx = content.indexOf('id: "girls-hygiene"');
// Find the next mid-day-meal
const endIdx = content.indexOf('id: "mid-day-meal"', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    // The brace before id: "girls-hygiene"
    const braceStart = content.lastIndexOf('{', startIdx);
    // The brace before id: "mid-day-meal"
    const braceEnd = content.lastIndexOf('{', endIdx);
    
    const replacement = `{
    id: "girls-hygiene",
    title: "Girls' Hygiene Drive",
    description: "Distributing sanitary hygiene pads to girls in slum areas — giving them dignity, health and confidence every month.",
    icon: "💜",
    date: "Active",
    coverImage: "/gallery/girls-hygiene/gh1.jpeg",
    images: [
      { src: "/gallery/girls-hygiene/gh1.jpeg", caption: "“Dignity begins with care. A small gesture today can bring comfort, confidence, and hope tomorrow.” 🌼💙" },
      { src: "/gallery/girls-hygiene/gh2.jpeg", caption: "“Stronger together—when women support women, communities rise with them.” 💪✨" },
      { src: "/gallery/girls-hygiene/gh3.jpeg", caption: "“Not just essentials, but respect and compassion—delivered hand to hand.” 🤝💛" },
      { src: "/gallery/girls-hygiene/gh4.jpeg", caption: "“Every packet carries more than aid—it carries reassurance that someone cares.” 🌸📦" },
      { src: "/gallery/girls-hygiene/gh5.jpeg", caption: "“Hope grows where care is shared. Together, we’re building healthier, safer futures for every woman and child.” 🌱❤️" },
      { src: "/gallery/girls-hygiene/gh6.mp4", caption: "“Dignity, health, and confidence — every girl deserves it.”" }
    ],
  },
  // {
  //   id: "education",
  //   title: "Education Support",
  //   description: "Providing books, stationery and geometric boxes to underprivileged students so no child is denied the right to learn.",
  //   icon: "📚",
  //   date: "Active",
  //   coverImage: null,
  //   images: [],
  // },
  `;
    
    content = content.substring(0, braceStart) + replacement + content.substring(braceEnd);
    fs.writeFileSync(file, content);
    console.log("Fixed!");
} else {
    console.log("Could not find boundaries");
}
