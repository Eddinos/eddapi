const { mergeSchemas } = require('@graphql-tools/merge');
const projectSchema = require('./projectSchema')

const merged = mergeSchemas({
    schemas: [
        projectSchema
    ]
})

module.exports = merged