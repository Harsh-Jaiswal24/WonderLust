const mongoose= require("mongoose");
const Listing= require("../models/listing.js");
const User = require("../models/user.js")
const Review= require("../models/review.js")
const  sampleListings= require("./data.js");

const MONGO_URL="<dburl>";

main()
.then(()=>{console.log("Database Connected")})
.catch((err)=>{console.log(err)});
 async function main()
     {
            await mongoose.connect(MONGO_URL);
    }

const initdb=async ()=>{
    // console.log(sampleListings);
    await Listing.deleteMany({});
    await Review.deleteMany({});
    console.log("all listing and reviews deleted")
    //adding new object in the sampleListings data 
  const newsampleListings = sampleListings.map((obj)=>({...obj, owner:"<owner id>"} ));
    await Listing.insertMany(newsampleListings);
    console.log("New fresh data inserted")
    
};
initdb(); 