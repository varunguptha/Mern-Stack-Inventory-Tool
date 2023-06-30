const express = require('express');
const { registerUser, loginUser, logout, getuser, loginStatus, updateuser, changepassword, forgotPassword } = require('../controllers/userController');
const protect = require('../middleWare/authMiddleware');
const router = express.Router();


router.post("/register", registerUser)
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getuser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateuser);
router.patch("/changepassword", protect, changepassword);
router.post("/forgotpassword", forgotPassword);





module.exports = router