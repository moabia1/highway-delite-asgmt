const express = require("express");
const {
  listExperiences,
  getExperience,
} = require("../controllers/experienceController");


const router = express.Router();
router.get("/", listExperiences);
router.get("/:id", getExperience);

module.exports = router;
