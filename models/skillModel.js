const mongoose = require('mongoose')
const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sliderSide: {
        type: String,
        enum: ['left', 'right'],
        default: 'left'
    },
    barStyle: {
        type: Object
    },
    technos: {
        type: Array
    },
    category: {
        type: String
    }
  })

  module.exports = mongoose.model('Skill', skillSchema)