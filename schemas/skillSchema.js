const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql/type')
const { skillModel } = require('../models')

const technoType = new GraphQLObjectType({
    name: 'Techno',
    fields () {
        return {
            techno: {
                type: GraphQLString
            },
            value: {
                type: GraphQLInt
            }
        }
    }
})

const styleType = new GraphQLObjectType({
    name: 'Style',
    fields () {
        return {
            backgroundColor: {
                type: GraphQLString
            }
        }
    }
})

const skillType = new GraphQLObjectType({
    name: 'Skill',
    fields () {
        return {
            title: {
                type: GraphQLString
            },
            sliderSide: {
                type: GraphQLString
            },
            barStyle: {
                type: styleType
            },
            technos: {
                type: GraphQLList(technoType)
            },
            category: {
                type: GraphQLString
            }
        }
    }
})

const skillQuery = new GraphQLObjectType({
    name: 'SkillQuery',
    fields: {
        skills: {
            type: new GraphQLList(skillType),
            async resolve () {
                return await skillModel.find({})

            }
        },
        skill: {
            type: skillType,
            args: {
                id: {
                    type: GraphQLInt
                },
                title: {
                    type: GraphQLString
                }
            },
            async resolve (root, { id, title = '' }) {
                const res = await skillModel.findOne({
                    id, 
                    title: new RegExp(title, 'i')
                })
                return res
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: skillQuery
})