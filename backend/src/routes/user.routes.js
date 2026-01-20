const express = require("express");
const { createUser, getAllUsers, getLoggedInUserDetails, login, deleteUser } = require("../controllers/user.controller");
const upload = require("../middlewares/imageUpload");
const {isAuthenticated} = require("../middlewares/isAuthenticated");

// const upload = require("../middleware/upload");
// const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/users",
  upload.single("image"),
   createUser);
router.get("/users", isAuthenticated,  getAllUsers);
router.delete("/users/:id", isAuthenticated,  deleteUser);
router.post("/users/login",  login);
// router.delete("/user/:id", deleteUser);

// auth me 
router.get("/me", isAuthenticated, getLoggedInUserDetails);

module.exports = router;
