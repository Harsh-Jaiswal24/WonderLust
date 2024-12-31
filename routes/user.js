const express= require("express");
const router= express.Router();
const User= require("../models/user.js");
const wrapAsync=  require("../utils/wrapAsync.js");
const passport = require('passport');
const { isLoggedin } = require("../middleware.js");
const {saveRedirectUrl}= require("../middleware.js");
//Adding User Controller
const userController= require("../controllers/user.js");



router.get("/signup",userController.renderSignupForm);

router.post("/signup", wrapAsync(userController.signUp));
 
router.get("/login", userController.renderLoginForm);

router.post("/login", saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}), 
   userController.login);

router.get("/logout", isLoggedin , userController.logout);

module.exports= router;
