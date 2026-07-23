import natesa from "../assets/artifacts/Natesa.jpg";
import umaMaheshvara from "../assets/artifacts/Uma-Maheshvara.jpg";
import vishnu from "../assets/artifacts/Vishnu.jpg";
import yogaNarayana from "../assets/artifacts/Yoga-narayana.jpg";


const artifacts = [
  {
    id: 1,
    title: "Natesa",
    museum: "National Museum",
    dynasty: "Chola",
    material: "Stone",
    period: "12th Century",
    description:
      "Representation of Lord Shiva as Nataraja.",
    image: natesa,
    model: "/models/Natesa.glb",
    likes: 65,
    views: 2039,
  },

  {
    id: 2,
    title: "Vishnu",
    museum: "National Museum",
    dynasty: "Gupta",
    material: "Stone",
    period: "10th Century",
    description:
      "Standing Vishnu sculpture.",
    image: vishnu,
    model: "/models/Vishnu.glb",
    likes: 59,
    views: 2531,
  },
  {
    id: 3,
    title: "Yoga Narayana",
    museum: "National Museum",
    dynasty: "Hoysala",
    material: "Stone",
    period: "12th Century CE",
    description:
      "A finely carved stone sculpture depicting Lord Vishnu in his meditative Yoga Narayana form. The image reflects the intricate craftsmanship of the Hoysala period and emphasizes serenity, balance, and spiritual contemplation.",
    image: yogaNarayana,
    model: "/models/Yoga-narayana.glb",
    likes: 89,
    views: 2011,
  },
  {
    id: 4,
    title: "Uma Maheshvara",
    museum: "National Museum",
    dynasty: "Chola",
    material: "Bronze",
    period: "11th Century CE",
    description:
      "A bronze sculpture portraying Lord Shiva (Maheshvara) seated with Goddess Parvati (Uma), symbolizing divine harmony, family, and cosmic balance. This masterpiece is an excellent example of Chola bronze artistry.",
    image: umaMaheshvara,
    model: "/models/Uma-Mahesvara.glb",
    likes: 98,
    views: 1804,
  },
];

export default artifacts;