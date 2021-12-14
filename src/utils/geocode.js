const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFubGV4NiIsImEiOiJja3d6MGxpMXYwcWQ1MnBxb2ZmaWc2dTY1In0.CNCd3PMHuA7yJ2KGw8RZEA&limit=1`;
    
    request({url, json: true }, (error, response) => {
        const features = response.body.features || [];
        if (error){
            callback('Unable to connect to geocoding service!');
        }  
        else if (features.length == 0){
            callback('Unable to find location, Try another search.');    
        }
        else {
            const feature = features[0];

            const [longitude, latitude] = feature.center;
            const location = feature.place_name;
            callback(null, { latitude, longitude, location})
        }
    })
}

module.exports = geocode;