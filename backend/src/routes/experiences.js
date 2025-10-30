const express = require("express");
const router = express.Router();
const {
  listExperiences,
  getExperience,
} = require("../controllers/experienceController");

router.get("/", listExperiences);
router.get("/:id", getExperience);

module.exports = router;
