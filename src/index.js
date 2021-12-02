const app = require('express')()
const consign = require('consign')
const mongoose = require('mongoose')
require('./config/mongodb')

app.mongoose = mongoose