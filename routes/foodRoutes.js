const express = require("express");
const getFoodInfo = require("../controllers/foodControllers");
const router = express.Router();

router.get("/:barcode", getFoodInfo);

module.exports = router;