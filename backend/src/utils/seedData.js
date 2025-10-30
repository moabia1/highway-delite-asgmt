const mongoose = require("mongoose");
require("dotenv").config();
const Experience = require("../models/Experience");
const connectDB = require("../db");

const seed = async () => {
  await connectDB();
  await Experience.deleteMany();
  const exps = [
    {
      title: "Kayaking",
      slug: "kayaking",
      location: "Udupi",
      description:
        "Curated small-group experience. Certified guide. Safety first with gear included.",
      image:
        "https://images.unsplash.com/photo-1476988186444-a7189cf07b3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      basePrice: 999,
      slots: [
        {
          date: "Oct 28",
          times: [
            { time: "07:00 am", capacity: 6, price: 999, sold: 0 },
            { time: "09:00 am", capacity: 6, price: 999, sold: 0 },
          ],
        },
        {
          date: "Oct 29",
          times: [{ time: "09:00 am", capacity: 6, price: 999, sold: 0 }],
        },
      ],
    },
    {
      title: "Scuba Diving",
      slug: "scuba-diving",
      location: "Goa",
      description:
        "Explore marine life with expert divers. Includes equipment, training, and underwater photos.",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2N1YmElMjBEaXZpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      basePrice: 2499,
      slots: [
        {
          date: "Oct 30",
          times: [
            { time: "08:00 am", capacity: 8, price: 2499, sold: 0 },
            { time: "10:30 am", capacity: 8, price: 2499, sold: 0 },
          ],
        },
        {
          date: "Nov 1",
          times: [{ time: "09:00 am", capacity: 6, price: 2499, sold: 0 }],
        },
      ],
    },
    {
      title: "Paragliding Adventure",
      slug: "paragliding-adventure",
      location: "Bir Billing",
      description:
        "Soar high above the mountains with certified pilots. A must-try adventure for thrill seekers.",
      image:
        "https://images.unsplash.com/photo-1605370390296-8955949e2946?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFBhcmFnbGlkaW5nJTIwQWR2ZW50dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      basePrice: 1999,
      slots: [
        {
          date: "Oct 31",
          times: [
            { time: "07:30 am", capacity: 5, price: 1999, sold: 0 },
            { time: "09:00 am", capacity: 5, price: 1999, sold: 0 },
          ],
        },
      ],
    },
    {
      title: "Trekking Expedition",
      slug: "trekking-expedition",
      location: "Coorg",
      description:
        "Guided nature trek through scenic trails. Includes refreshments and professional guide.",
      image:
        "https://media.istockphoto.com/id/649356542/photo/adventurous-people-making-ascent-to-high-mountain-walking-on-glacier.webp?a=1&b=1&s=612x612&w=0&k=20&c=qRNUM9m4We5lJfOsU9l4Equ5Hf2kccC3y24i_NPvtLk=",
      basePrice: 1499,
      slots: [
        {
          date: "Nov 2",
          times: [
            { time: "06:00 am", capacity: 10, price: 1499, sold: 0 },
            { time: "07:30 am", capacity: 10, price: 1499, sold: 0 },
          ],
        },
      ],
    },
    {
      title: "Sunset Cruise",
      slug: "sunset-cruise",
      location: "Kochi",
      description:
        "Enjoy a relaxing cruise with live music and dinner as the sun sets over the Arabian Sea.",
      image:
        "https://images.unsplash.com/photo-1576423601401-f2c5161988e3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFN1bnNldCUyMENydWlzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      basePrice: 1799,
      slots: [
        {
          date: "Oct 30",
          times: [
            { time: "05:00 pm", capacity: 20, price: 1799, sold: 0 },
            { time: "06:30 pm", capacity: 20, price: 1799, sold: 0 },
          ],
        },
      ],
    },
    {
      title: "Rock Climbing",
      slug: "rock-climbing",
      location: "Hampi",
      description:
        "Challenge yourself with natural boulders. Includes gear, safety briefing, and expert supervision.",
      image:
        "https://media.istockphoto.com/id/518208206/photo/extreme-winter-climbing.webp?a=1&b=1&s=612x612&w=0&k=20&c=pSVOGiPm0TR0H0UN-XyxP__7W3C6ALcuW1ADsusQ1qk=",
      basePrice: 1299,
      slots: [
        {
          date: "Nov 3",
          times: [
            { time: "07:00 am", capacity: 8, price: 1299, sold: 0 },
            { time: "09:00 am", capacity: 8, price: 1299, sold: 0 },
          ],
        },
      ],
    },
    {
      title: "Camping Under the Stars",
      slug: "camping-under-the-stars",
      location: "Rishikesh",
      description:
        "Overnight camping experience with bonfire, BBQ, and river-side music sessions.",
      image:
        "https://media.istockphoto.com/id/1213691529/photo/tourists-sitting-around-bonfire-in-night-forest.webp?a=1&b=1&s=612x612&w=0&k=20&c=3O2Jh-ezHuRPpnxYfdxTbiUu3SSfDAirvoXCo3NT0qU=",
      basePrice: 1599,
      slots: [
        {
          date: "Nov 1",
          times: [
            { time: "06:00 pm", capacity: 12, price: 1599, sold: 0 },
            { time: "08:00 pm", capacity: 12, price: 1599, sold: 0 },
          ],
        },
      ],
    },
    {
      title: "Surfing Lessons",
      slug: "surfing-lessons",
      location: "Pondicherry",
      description:
        "Learn to ride waves with trained instructors. Perfect for beginners and thrill-seekers alike.",
      image:
        "https://media.istockphoto.com/id/1398970870/photo/man-instructor-demonstrating-how-to-paddle-in-the-water-by-hands-on-surfboard-to-indian-woman.webp?a=1&b=1&s=612x612&w=0&k=20&c=vH-IuMkq3rX1IcjUWhIneZ6K1Q5BDJ0N5cPjhvAjaKg=",
      basePrice: 1199,
      slots: [
        {
          date: "Oct 29",
          times: [
            { time: "07:00 am", capacity: 6, price: 1199, sold: 0 },
            { time: "09:00 am", capacity: 6, price: 1199, sold: 0 },
          ],
        },
        {
          date: "Oct 31",
          times: [{ time: "08:30 am", capacity: 6, price: 1199, sold: 0 }],
        },
      ],
    },
    {
      title: "ATV Desert Ride",
      slug: "atv-desert-ride",
      location: "Jaisalmer",
      description:
        "Feel the adrenaline rush on desert dunes. Fully automatic ATVs and safety gear provided.",
      image:
        "https://plus.unsplash.com/premium_photo-1661962466364-1f54edb628cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2128",
      basePrice: 1899,
      slots: [
        {
          date: "Nov 2",
          times: [
            { time: "07:30 am", capacity: 8, price: 1899, sold: 0 },
            { time: "09:00 am", capacity: 8, price: 1899, sold: 0 },
          ],
        },
      ],
    },
    {
      title: "Caving Exploration",
      slug: "caving-exploration",
      location: "Meghalaya",
      description:
        "Discover underground wonders with expert cavers. Includes gear, helmet, and guidance.",
      image:
        "https://plus.unsplash.com/premium_photo-1661963750574-f23278d45184?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2F2aW5nJTIwRXhwbG9yYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      basePrice: 2099,
      slots: [
        {
          date: "Nov 3",
          times: [
            { time: "08:00 am", capacity: 6, price: 2099, sold: 0 },
            { time: "10:00 am", capacity: 6, price: 2099, sold: 0 },
          ],
        },
      ],
    },
    {
      title: "Zipline Adventure",
      slug: "zipline-adventure",
      location: "Lonavala",
      description:
        "High-speed zipline over scenic valleys. Includes safety gear and professional supervision.",
      image:
        "https://plus.unsplash.com/premium_photo-1683133786738-71a6244375e2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8WmlwbGluZSUyMEFkdmVudHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      basePrice: 1399,
      slots: [
        {
          date: "Oct 30",
          times: [
            { time: "08:30 am", capacity: 10, price: 1399, sold: 0 },
            { time: "10:00 am", capacity: 10, price: 1399, sold: 0 },
          ],
        },
      ],
    },
    // more experiences...
  ];


  await Experience.insertMany(exps);
  console.log("Seeded");
  
  process.exit(0);
};

seed().catch((err) => console.error(err));
