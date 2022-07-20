import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import './database/connection'
import apiRoutes from './routes/api'
import fccTestingRoutes from './routes/fcctesting.js'
import runner from './test-runner'

let app = express()

app.use('/public', express.static(`${__dirname}/public`))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Sample front-end
app.get('/:project/', function (req, res) {
  res.sendFile(`${__dirname}/views/issue.html`)
})

//Index page (static HTML)
app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/views/index.html`)
})

//For FCC testing purposes
fccTestingRoutes(app)

//Routing for API 
apiRoutes(app)

//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found')
})

const PORT = process.env.PORT || 3000


//Start our server and tests!
app.listen(PORT, function () {
  console.log(`Your app is listening on port ${PORT}`)
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...')
    setTimeout(function () {
      try {
        (runner as any).run()
      } catch (e) {
        console.log('Tests are not valid:')
        console.error(e)
      }
    }, 3500)
  }
})

export default app