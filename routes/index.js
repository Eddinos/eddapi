const express = require('express')
const routes = express.Router()
const { graphql } = require('graphql')
const { graphqlHTTP } = require('express-graphql')

const schema = require('../schemas')

routes.get('/', (req, res) => {
    res.send(`Pomme de reinette et pommeddapi`)
})

routes.use('/graphql', graphqlHTTP(req => {
    return {
        schema,
        graphiql: true
    }
}))

routes.get('*', function(req, res){
    res.status(404).send('You\'ve met with a terrible fate, haven\'t you ?');
});

module.exports = routes