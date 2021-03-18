const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql/type')
const { projectModel } = require('../models')

const projectType = new GraphQLObjectType({
    name: 'Project',
    fields () {
        return {
            id: {
                type: GraphQLInt
            },
            title: {
                type: GraphQLString
            },
            media: {
                type: GraphQLString
            },
            shortDescription: {
                type: GraphQLString
            },
            longDescription: {
                type: GraphQLString
            },
            technos: {
                type: GraphQLList(GraphQLString)
            },
            completion: {
                type: GraphQLInt,
                resolve ({ completion }) {
                    if (!completion) return 0
                    return completion
                }
            },
            sourceCode: {
                type: GraphQLString,
                resolve ({ sourceCode, title }) {
                    if (!sourceCode) {
                        return `Unfortunately, the source code for ${title} is not available`
                    }
                    return sourceCode
                }
            },
            url: {
                type: GraphQLList(GraphQLString),
                resolve ({ url, title }) {
                    if (!url) {
                        return [`Unfortunately, this gem is not deployed on the world wide web`]
                    }
                    return [url]
                }
            }
        }
    }
})

const projectQuery = new GraphQLObjectType({
    name: 'ProjectQuery',
    fields: {
        projects: {
            type: new GraphQLList(projectType),
            async resolve () {
                return await projectModel.find({})

            }
        },
        project: {
            type: projectType,
            args: {
                id: {
                    type: GraphQLInt
                },
                title: {
                    type: GraphQLString
                }
            },
            async resolve (root, { id, title = '' }) {
                const res = await projectModel.findOne({
                    id, 
                    title: new RegExp(title, 'i')
                })
                return res
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: projectQuery
})