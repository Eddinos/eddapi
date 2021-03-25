const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema, GraphQLBoolean } = require('graphql/type')
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
                type: GraphQLString
            },
            url: {
                type: GraphQLString
            },
            archived: {
                type: GraphQLBoolean
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
                const rawProjects = await projectModel.find({})
                return rawProjects.filter(project => !project.archived)
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