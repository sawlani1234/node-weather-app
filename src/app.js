const path = require('path')
const express = require('express') 
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000 

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Shubhham Sawlani'
    })
}

)

app.get('/about',(req,res) => {
    res.render('about',
     {
        title: 'About Me',
        name: 'Shubhham Sawlani'
    })
}

)

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Shubhham Sawlani'

    })
}

)

app.get('/weather',(req,res) => {

          
    if(!req.query.address)
    {
        return res.send({
            error: 'Provide address'
        })

    }
     geocode(req.query.address,(error,{ latitude,longitude, location} ={}) => {
        
        if(error){
          return res.send({error})
            }

        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address : req.query.address
            })
        })
     
       })
 })

app.get('/help/*',(req,res) => {
    res.render('404',{
        title : '404',
        name : 'Shubham',
        errorMessage : 'Help page not available'
     }
    )
})
    

app.get('*',(req,res) => {
res.render('404',{
    title: '404',
    name: 'Shubham',
    errorMessage: 'Page Not found'    
})
})

app.listen(port, () => {
    console.log('Server is up and running')
})

