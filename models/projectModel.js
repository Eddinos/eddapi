const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true,
      required: true
    },
    title: {
          type: String,
          required: true
      },
    media: {
          type: String,
          required: true
    },
    shortDescription: {
          type: String,
          required: true
    },
    technos: {
      type: Array
    },
    completion: {
        type: Number
    },
    sourceCode: {
        type: String
    },
    url: {
        type: String
    }
  })

  module.exports = mongoose.model('Project', projectSchema)