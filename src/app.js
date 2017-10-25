const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config/config')
const routes = require('./routes/')
const mongoose = require('mongoose')
const app = express()

routes(app)

app
    .set("views", __dirname + "/views")
    .set("view engine", "hjs")
    .use(bodyParser.json())
    .use(cors())

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Urls', function (err, db) {
    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('Successfully connected to MongoDB on port 8000.');
    }
})

app.listen(config.port)