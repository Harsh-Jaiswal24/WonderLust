const express= require("express");
const router= express.Router();
const wrapAsync=  require("../utils/wrapAsync.js");
const {listingschema}= require("../schema.js");
const listings= require("../routes/listing.js")
const Listing=  require("../models/listing.js");
const expresserror= require("../utils/expresserror.js");
const User=require("../models/user.js");
const passport = require('passport');
const { isLoggedin } = require("../middleware.js");

//Multer for handling image upload in forms
const multer= require("multer");

const {storage,cloudinary}= require("../cloudConfig.js"); 
const upload= multer({storage});
 
//importing Controllers
const listingControllers= require("../controllers/listing.js");

const validatelisting= (req,res,next)=>{
    let {error} = listingschema.validate(req.body);
    if(error){
        let errmsg= error.details.map((el)=>el.message).join(",");
       console.log(errmsg);
        throw new expresserror(400,errmsg);
    }else{
        next();
    }
}
const validatesearch=(req,res,next)=>{
    const {searchedlocation}= req.query;
    if(searchedlocation && searchedlocation.trim() !=='' && searchedlocation){
            next()
    }else{
        throw new expresserror(422,"Please Search a valid location");
    }
};

const isOwner = async (req, res, next) => {
    try {
                          const { id } = req.params; // Extract the listing ID from route parameters
         if (id.length !== 24) {
                              req.flash("error", "Invalid Listing ID!");
                              return res.redirect("/listings");
                            } else{
                          const listing = await Listing.findById(id); // Fetch the listing from the database
                          if (!listing) {
                              throw new expresserror(404, "Listing not found"); // If the listing doesn't exist
                          }
                          // Check if the logged-in user is the owner
                          if (!listing.owner.equals(req.user._id)) {
                              req.flash("error", "You are not the owner of this listing");
                              return res.redirect("/listings"); // Adjust the redirect path as per your routes
                          }
                          next(); // Proceed to the next middleware or route handler
              }
    } catch (err) {
        next(err); // Pass the error to the error handler middleware
    }
};

router.get("/",wrapAsync(listingControllers.index));
router.get("/s",validatesearch,wrapAsync(listingControllers.searched));


router.get("/new",isLoggedin, listingControllers.renderNewForm);

router.get("/:id",wrapAsync(listingControllers.showListing));

router.post("/",
    isLoggedin,
    upload.single("listing[image]"),
   validatelisting,
    wrapAsync(listingControllers.addNewListing)); 

router.get("/:id/update",isLoggedin,isOwner,wrapAsync(listingControllers.renderEditForm));

router.put("/:id",isLoggedin,isOwner,upload.single("listing[image]"),validatelisting,wrapAsync(listingControllers.editListing));

router.delete("/:id",isLoggedin,isOwner,wrapAsync(listingControllers.deleteListing));

module.exports= router;
