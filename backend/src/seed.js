const mongoose = require("mongoose");
const Experience = require("./models/Experience");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bookit";

async function seed() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to Mongo for seeding");
  const count = await Experience.countDocuments();
  if (count > 0) {
    console.log("Experiences already present, skipping seed");
    process.exit(0);
  }

  const experiences = [
    {
      title: "Sunset Beach Walk",
      description: "Relaxing walk along the shoreline with a guide.",
      price: 50,
      image: "/images/beach.jpg",
      slots: [
        { date: "2025-11-05", time: "17:00", seats: 10 },
        { date: "2025-11-06", time: "17:00", seats: 8 },
      ],
      location: "Bengaluru"
    },
    {
      title: "Mountain Hike Adventure",
      description: "Half-day guided hike with scenic views.",
      price: 120,
      image: "/images/mountain.jpg",
      slots: [
        { date: "2025-11-07", time: "08:00", seats: 12 },
        { date: "2025-11-08", time: "08:00", seats: 12 },
      ],
      location:"Manali"
    },
  ];

  await Experience.insertMany(experiences);
  console.log("Seeded experiences");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
