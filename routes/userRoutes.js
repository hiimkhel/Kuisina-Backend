const express =  require("express");
const {loginUser, registerUser, updateUser, getBmi, updateBmi} = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:userId", updateUser );
router.patch("/updateBmi/:userId", updateBmi);
router.get("/bmi/:userId", getBmi);
module.exports = router;
