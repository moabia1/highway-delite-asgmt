const Experience = require("../models/Experience");

exports.listExperiences = async (req, res) => {
  const items = await Experience.find();
  res.json({ experiences: items });
};

exports.getExperience = async (req, res) => {
  const id = req.params.id;

  const exp = await Experience.findById(id);
  
  if (!exp) return res.status(404).json({ message: "Not found" });
  res.json({ experience: exp });
};
