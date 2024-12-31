    const express= require("express");
    const app= express();
    const mongoose= require("mongoose");
    const path= require("path");
    const methodOverRide= require("method-override");
    const ejsmate= require("ejs-mate"); 
    const expresserror= require("./utils/expresserror.js");
    const wrapAsync=require("./utils/wrapAsync.js");

    const listingRouter= require("./routes/listing.js")
    const reviewRouter= require("./routes/review.js");
    const userRoute= require("./routes/user.js");


    const cookieParser = require("cookie-parser");
    const session= require("express-session");
    const MongoStore=require("connect-mongo");
    const flash=require("connect-flash");
    const passport= require("passport"); 
     const LocalStrategy= require("passport-local");
    const User=require("./models/user.js");
   
    if(process.env.NODE_ENV !="production"){
    require("dotenv").config(); 
    }
    const dburl=process.env.ATLASDB_URL;
    const secretcode=process.env.SECRETCODE

main().then(()=>{console.log("Database Connected")})
                .catch((err)=>{console.log(err)});
    async function main() {
                    await mongoose.connect(dburl);
                }
//creating mongo session store

const sessionStore=MongoStore.create({
    mongoUrl: dburl,
    crypto:{
        secret:secretcode,
    },
    touchAfter:24*3600,
});

//Creating Session 
    const sessionOptions={
        store: sessionStore,
        secret:secretcode,
        resave: false,
        saveUninitialized:true,
        cookie:{
            expires: Date.now()+1000*60*60*24*3,
            maxAge:1000*60*60*24*3,
            httpOnly:true
        }
    };

    app.use(session(sessionOptions));
    //creatingflash 
    app.use(flash());
   app.use(passport.initialize());
    app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 
    app.use((req,res,next)=>{
        //res.locals is used to pass the data to all the templates It can be used anywhere within the website
        res.locals.success= req.flash("success");
        res.locals.deleted= req.flash("deleted");
        res.locals.updated= req.flash("updated");
        res.locals.reviewadd= req.flash("reviewadd");
        res.locals.reviewdel= req.flash("reviewdel");
        res.locals.error= req.flash("error");
        res.locals.currentUser=req.user;    
        next();
    });

    //////
/////////////////////////////////

    app.use(methodOverRide("_method"));
    app.set("view engine", "ejs");
    app.set("views",path.join(__dirname,"views"));
    app.use(express.urlencoded({extended:true}));
    app.engine("ejs",ejsmate);
    app.use(express.static(path.join(__dirname,"public")));
    app.use(cookieParser(secretcode));
  
//Cookies


    app.use("/listings", listingRouter);
    app.use("/listings/:id/reviews",reviewRouter);
    app.use("/",userRoute);
    app.get("/",(req,res)=>{
        res.redirect("/listings")
    });
  // Catch-all 404 handler
app.all("*", (req, res, next) => {
    next(new expresserror(404, "Page not Found"));
});

// General error handler middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went Wrong!" } = err;
    res.status(statusCode).render("error.ejs", { err });
}); 

    app.listen(8080,()=>{
        console.log("Listening at port 8080");
    });
