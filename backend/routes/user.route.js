const express = require("express");
const router = express.Router();
const { loginAdmin,registerUser } = require("../controllers/user.controller");

router.post("/login", loginAdmin);
router.post("/signup", registerUser);


module.exports = router;