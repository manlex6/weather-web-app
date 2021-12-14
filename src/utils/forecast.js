const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a698e03f62d67bcf1b6ef29a9fb224c9&query=${latitude},${longitude}&units=f`;

    request({url, json: true}, (error, response) => { 
        if (error){
            callback('Unable to connect to weather service!');
        }  
        else if (response.body.error){
            callback('Unable to find location');    
        }
        else {
            callback(null, response.body.current);
        }

    });    
}


module.exports = forecast;