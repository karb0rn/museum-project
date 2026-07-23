import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Artifact from "./models/Artifact.js";

dotenv.config();

await connectDB();

const artifacts = [
  {
    id: 1,
    title: "Natesa",
    museum: "Government Museum, Chennai",
    dynasty: "Chola",
    material: "Bronze",
    period: "11th Century",
    description:
      "A magnificent bronze sculpture of Lord Shiva as Natesa (Lord of Dance), representing the cosmic dance of creation and destruction.",
    image: "/artifacts/Natesa.jpg",
    model: "/models/Natesa.glb",
    likes: 0,
    views: 0,
  },
  {
    id: 2,
    title: "Vishnu",
    museum: "National Museum, New Delhi",
    dynasty: "Gupta",
    material: "Stone",
    period: "6th Century",
    description:
      "An intricately carved standing sculpture of Lord Vishnu showcasing the elegance of Gupta period craftsmanship.",
    image: "/artifacts/Vishnu.jpg",
    model: "/models/Vishnu.glb",
    likes: 0,
    views: 0,
  },
  {
    id: 3,
    title: "Yoga Narayana",
    museum: "Indian Museum, Kolkata",
    dynasty: "Hoysala",
    material: "Stone",
    period: "12th Century",
    description:
      "A rare depiction of Lord Narayana seated in a yogic posture, symbolizing meditation, balance, and spiritual wisdom.",
    image: "/artifacts/Yoga-narayana.jpg",
    model: "/models/Yoga-narayana.glb",
    likes: 0,
    views: 0,
  },
  {
    id: 4,
    title: "Uma Mahesvara",
    museum: "Government Museum, Chennai",
    dynasty: "Pallava",
    material: "Granite",
    period: "8th Century",
    description:
      "A beautiful sculpture of Lord Shiva and Goddess Parvati seated together, symbolizing divine harmony and family.",
    image: "/artifacts/Uma-Maheshvara.jpg",
    model: "/models/Uma-Mahesvara.glb",
    likes: 0,
    views: 0,
  },
];

try {
  await Artifact.deleteMany();
  await Artifact.insertMany(artifacts);

  console.log("✅ Database seeded successfully!");
  process.exit();
} catch (err) {
  console.error(err);
  process.exit(1);
}