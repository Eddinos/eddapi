const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8888
const routes = require('./routes')

const uri =  'mongodb://localhost:27017/'
mongoose.connect(uri)

const app = express()
app.listen(PORT, () => console.log('there will be dragons => port: ' + PORT))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)