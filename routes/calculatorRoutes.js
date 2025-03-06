const express = require("express");
const { calculateBMI, calculateTDEE } = require("../controllers/calculatorController");
const router = express.Router();

router.post("/bmi", calculateBMI);
router.post("/tdee", calculateTDEE);

module.exports = router;