
const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/c3b2e71df555fa970a751f9b9246170c/' + latitude + ',' + longitude 
      request({url , json: true},(error , { body }) => {
     if(error)
     {
         callback("No internet connection",undefined)
     }
     else if(body.error)
     {
       callback("Unable to Find Location",undefined)
     }
     else{
        callback(undefined, body.daily.data[0].summary + ' It is currently ' +  body.currently.temperature + ' degress out. There is a ' +  body.currently.precipProbability + '% chance of rain.')
             }
     }
)
}

module.exports =forecast

