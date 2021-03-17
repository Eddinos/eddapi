const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 9999
const routes = require('./routes')

const uri =  process.env.PROD_MONGODB || 'mongodb://localhost:27017/'
mongoose.connect(uri)

const app = express()
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	if (req.method === 'OPTIONS') {
		res.end();
	} else {
	next();
	}
});
app.listen(PORT, () => console.log('there will be dragons => port: ' + PORT))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)