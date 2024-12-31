const express= require("express");
const router= express.Router({mergeParams:true});
const wrapAsync=  require("../utils/wrapAsync.js");
const expresserror= require("../utils/expresserror.js");
const Review=  require("../models/review.js");
const Listing=  require("../models/listing.js");
const {reviewschema}= require("../schema.js");
const { isLoggedin} = require("../middleware.js");
const { createReview } = require("../controllers/review.js");

//Adding Con
const reviewControllers=require("../controllers/review.js");

const validatereview= (req,res,next)=>{
    const {error}= reviewschema.validate(req.body);
    if(error){
        const msg= error.details.map(el=>el.message).join(",");
        throw new expresserror(msg,400);
    }else{
        next();
    }
}
const isReviewAuthor= async (req,res,next)=>{
    let {id,reviewId}= req.params;
    // console.log(id,reviewId);
    let review= await Review.findById(reviewId);
    // console.log(review.author._id);
    // console.log("review authr",review.author);
    // console.log("currentUserid",res.locals.currentUser._id);
    if(!review.author.equals(res.locals.currentUser._id)){
            req.flash("error","You can not delete this review");
            return res.redirect(`/listings/${id}`);
    }
    next();
}

router.post("/", isLoggedin,  validatereview, reviewControllers.createReview);
 
 router.delete( "/:reviewId", isLoggedin, isReviewAuthor, reviewControllers.deleteReview);

 module.exports= router;
