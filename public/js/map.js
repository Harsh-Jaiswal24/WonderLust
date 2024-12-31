
mapboxgl.accessToken =maptoken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listingdetail.geometry.coordinates, // Starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 10 // starting zoom
});

    const locationss= `${listingdetail.location}`+", "+`${listingdetail.country}`
    // Create a default Marker and add it to the map.
    const marker = new mapboxgl.Marker({ color: 'red'})
        .setLngLat(listingdetail.geometry.coordinates)  //Listing.gemetry.coordinates
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h6>${locationss}</h6><p>Expected Location</p>`))
        .addTo(map); 

