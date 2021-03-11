const { stitchSchemas } = require('@graphql-tools/stitch');
const projectSchema = require('./projectSchema')
const skillSchema = require('./skillSchema')
const experienceSchema = require('./experienceSchema')

const merged = stitchSchemas({
    subschemas: [
        projectSchema,
        skillSchema,
        experienceSchema
    ]
})

module.exports = merged