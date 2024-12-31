const User= require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp= async(req,res)=>{
    try{
        let {username, email,password}= req.body;
        const newUser= new User({username, email});
        const registeredUser= await User.register(newUser,password);
        // console.log(registeredUser);
        req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Thank you! You are registered");
        res.redirect("/listings");
       })
    }catch(err){
        req.flash("error",err.message)
        res.redirect("/signup");
    };   
};

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs"); 
};

module.exports.login= async (req,res)=>{
    // let {username,password}= req.body;
    // console.log(username,password);
    req.flash("success","Welcome-back to WounderLust");
    res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are Logged Out");
        res.redirect("/listings");
    });
};