  const mongoose= require("mongoose");
  const Review = require("./review");
  const Schema= mongoose;
  // const Review= require("./review.js");
  const listingschema= new mongoose.Schema({
      title: {
          type: String,
          // required: true,
        
      },
      description: String,
      image: {
          url: String,
          filename: String,
        },
      price:{
          type: Number,
          min: 0
      },
      location: String,
      country: String,
      reviews:[
        {
        type: Schema.Types.ObjectId,
        ref:"Review"
      },
    ],
    owner:{
      type: Schema.Types.ObjectId,
      ref:"User",
    }, 
    geometry: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    category:{
      type:String,
      enum: [
        "Trending",
        "Luxury",
        "Single Rooms",
        "Swimming Pool",
        "Beachfront",
        "Business Friendly",
        "Mountain View",
        "Top Cities",
        "Arctic"
      ],
      required:true,
    },
  });

  listingschema.post("findOneAndDelete", async(listing)=>{
    if(listing){
      await Review.deleteMany({_id:{$in: listing.reviews}})
  }});
  const Listing= new mongoose.model("Listing", listingschema);
  module.exports= Listing;
