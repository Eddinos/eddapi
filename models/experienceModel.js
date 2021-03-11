const mongoose = require('mongoose')
const experienceSchema = new mongoose.Schema({
    logo: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    duration: {
        type: Object
    }
  })

  module.exports = mongoose.model('Experience', experienceSchema)