const request = require('request')

const geocode = (address,callback)  => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address+  '.json?access_token=pk.eyJ1Ijoic2F3bGFuaTEyMyIsImEiOiJjanZydHVtdDEwZjVxM3pwbmFtbmNveXdtIn0.oNNFZ6OJRX_MAJWQri9Rdw&limit=1'
    request({url , json: true},(error , {body}) => {
     
             if(error)
             {
                callback("No internet connection",undefined)
             }
             else if(body.features.length==0)
             {
                callback("No such city found",undefined)
             }
             else
             {
               callback(undefined, {
                  latitude: body.features[0].center[1],
                  longitude: body.features[0].center[0],
                  location: body.features[0].place_name
            
                 })
             }
        })
  
  
  }
  module.exports = geocode


