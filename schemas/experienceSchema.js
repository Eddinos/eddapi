const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql/type')
const { experienceModel } = require('../models')

const durationType = new GraphQLObjectType({
    name: 'Duration',
    fields () {
        return {
            from: {
                type: GraphQLString
            },
            to: {
                type: GraphQLString
            }
        }
    }
})

const experienceType = new GraphQLObjectType({
    name: 'Experience',
    fields () {
        return {
            title: {
                type: GraphQLString
            },
            logo: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            duration: {
                type: durationType
            },
            category: {
                type: GraphQLString
            }
        }
    }
})

const experienceQuery = new GraphQLObjectType({
    name: 'ExperienceQuery',
    fields: {
        experiences: {
            type: new GraphQLList(experienceType),
            async resolve () {
                return await experienceModel.find({})

            }
        },
        experience: {
            type: experienceType,
            args: {
                id: {
                    type: GraphQLInt
                },
                title: {
                    type: GraphQLString
                }
            },
            async resolve (root, { id, title = '' }) {
                const res = await experienceModel.findOne({
                    title: new RegExp(title, 'i')
                })
                return res
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: experienceQuery
})