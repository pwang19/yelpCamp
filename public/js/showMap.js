mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
    center: [long, lat], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat([long, lat])
    .setPopup(new mapboxgl.Popup().setHTML(`<h3>${cgname}</h3>`)) // add popup
    .addTo(map);