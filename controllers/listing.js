    const Listing = require("../models/listing.js");
    const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
    const expresserror = require("../utils/expresserror.js");
    const maptoken=process.env.MAP_TOKEN;
    const geocodingClient = mbxGeocoding({ accessToken: maptoken });


module.exports.searched=async(req,res)=>{
    const {searchedlocation}= req.query;

    let containsOnlyNumbers = /^[0-9]+$/.test(searchedlocation);

    if (containsOnlyNumbers) {
        req.flash('error', 'Please Search for a valid location');
        res.redirect('/listings')
        // If the location contains only numbers, throw an error
        // throw new expresserror(422, "Please Search a valid location");
    }else{
    let coordinates=await geocodingClient.forwardGeocode({
        query: searchedlocation,
        limit: 1,
      }).send()

 if(
          coordinates.body.features && 
            coordinates.body.features.length > 0 && 
            coordinates.body.features[0].geometry && 
            coordinates.body.features[0].geometry.coordinates){
      const  [longitude, latitude] =coordinates.body.features[0].geometry.coordinates;
       // Ensure correct order: longitude, latitude
       const maxDistance = 15000;
        // Define the bounding box (min/max latitude and longitude)
        const minLongitude = longitude - (maxDistance / 111320); // approximate conversion from meters to degrees
        const maxLongitude = longitude + (maxDistance / 111320);
        const minLatitude = latitude - (maxDistance / 110540); // approximate conversion from meters to degrees
        const maxLatitude = latitude + (maxDistance / 110540); 
        try{
            const alllisting = await Listing.find({
            "geometry.coordinates": {
                $gte: [minLongitude, minLatitude],
                $lte: [maxLongitude, maxLatitude]
            }
        }).exec();
        if (alllisting.length === 0) {
            req.flash('error', 'No listings found for this location');
            return res.redirect('/listings');  // Redirect to the homepage or any other route you prefer
        }else{
        res.render("listings/index.ejs",{alllisting}); 
        }
    } catch (err) {
        res.status(500).json({ error: "Something went wrong", message: err.message });
    }}
    else{
        // throw new expresserror(422, "geometry.coordinates not found Please Search a valid location");
        req.flash('error', 'Please Search for a valid location');
        res.redirect('/listings')
    }
}
};

module.exports.index=async (req,res)=>{
    const {filter}=req.query;
    if(filter){
        const alllisting=await Listing.find({category:filter});
        res.render("listings/index.ejs",{alllisting});
    }
    if(!filter){
    const alllisting=   await Listing.find({});
    res.render("listings/index.ejs",{alllisting});
    }
};  

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing=async(req,res,err)=>{
    let {id}= req.params;
    if (id.length !== 24) {
        req.flash("error", "Invalid Listing ID!");
        return res.redirect("/listings");
      }
      else{
    const iddetail= await Listing.findById(id)
    .populate({
        path: "reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner"); 
    //adding flash for not exixted  listing
    if(!iddetail){
        req.flash("error","Listing does not Exists!");
        res.redirect("/listings");
    }else{
    // console.log(iddetail);
    ////////
    res.render("listings/show.ejs",{iddetail});   
    }
}
};

module.exports.addNewListing=async (req,res, next)=>{
    //taking geojson from mapbox sdk
    if(!req.body.listing){
        throw new expresserror(400,"No data added Please add any data");
 }else{
     const locationss= `${req.body.listing.location}`+", "+`${req.body.listing.country}`
       let coordinates=await geocodingClient.forwardGeocode({
           query: locationss,
           limit: 1,
         }).send()

         if(!coordinates.body.features || !coordinates.body.features[0] || !coordinates.body.features[0].geometry){ 
            req.flash("error","The location you added was not found");
            res.redirect(res.locals.redirectUrl || "/listings")
          }else{
         let url= req.file.path;
       let filename= req.file.filename;
       const { title, description, price,category, location, country } = req.body.listing;
       // Create a new listing object (use existing listing if editing an existing one)
       const newListing = new Listing({
           title :title,   // title: title (this shorthand is equivalent to title: title)
           description: description,   // description: description
           price: price,
           category:category,
           location: location,
           country:country,
       });
       newListing.owner=req.user._id;
       newListing.image={url,filename};
       newListing.geometry=coordinates.body.features[0].geometry; 
       newListing.save()
       .then((res) => {console.log(res);}).catch((err) => {console.error(err);});
       req.flash("success","Congratulations! Your Listing is added");
       res.redirect("/listings");
    }
    }
};


module.exports.renderEditForm=async (req,res)=>{
    let {id}= req.params;
    if (id.length !== 24) {
        req.flash("error", "Invalid Listing ID!");
        return res.redirect("/listings");
      }else{
    let iddetail= await Listing.findById(id)
    if(!iddetail){
        req.flash("error","Listing does not Exists!");
        res.redirect("/listings");
    };
    let originalImage=iddetail.image.url;
    originalImage=originalImage.replace("/upload","/upload/h_100,w_200")
    res.render("listings/edit.ejs",{iddetail, originalImage});
}
};

module.exports.editListing=async(req,res)=>{
    let {id}=req.params;
    if(!req.body.listing){
             throw new expresserror(400,"No data added Please add any data");
      }else{
    //adding new coordinates
    const locationss= `${req.body.listing.location}`+", "+`${req.body.listing.country}`
    let coordinates=await geocodingClient.forwardGeocode({
        query: locationss,
        limit: 1,
      }).send()

      if(!coordinates.body.features || !coordinates.body.features[0] || !coordinates.body.features[0].geometry){ 
        req.flash("error","The location you added was not found");
        res.redirect(res.locals.redirectUrl || "/listings")
      }else{

      req.body.listing.geometry=coordinates.body.features[0].geometry;
      ///
    let listing= await Listing.findByIdAndUpdate(id,req.body.listing,{new:true});
    if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    // console.log(listing);
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}
      }
};

module.exports.deleteListing=async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("deleted","Your Listing is deleted");
    res.redirect("/listings");
};