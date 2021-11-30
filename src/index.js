const app = require('express')()
const consign = require('consign')
const mongoose = require('mongoose')
require('./config/mongodb')

app.mongoose = mongoose

consign()
    // .include('.config/passport.js')
    // .then('./config/middlwares.js')
    // .then('./config/routes.js')