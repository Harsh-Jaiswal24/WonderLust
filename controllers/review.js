const Review=  require("../models/review.js");
const Listing=  require("../models/listing.js");


module.exports.createReview = async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newreview= new Review(req.body.review);
    newreview.author= req.user._id;
     listing.reviews.push(newreview);
     await listing.save();
     await newreview.save();
     req.flash("reviewadd","Thank you! Your review has been added")
    res.redirect(`/listings/${listing._id}`);
 };

 module.exports.deleteReview =  async(req,res)=>{
    let {id,reviewId}= req.params;
 let result= await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
//  console.log(result);
    await Review.findByIdAndDelete(reviewId);
    req.flash("reviewdel","Review Deleted");
    res.redirect(`/listings/${id}`);
};