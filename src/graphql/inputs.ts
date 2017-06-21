
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLEnumType } from 'graphql';
import { ValueType } from './common';

const GraphQLJsonType = require('graphql-type-json');

export const InputImage = new GraphQLInputObjectType({
    name: 'InputImage',
    fields:
    {
        data: {
            type: new GraphQLNonNull(GraphQLString)
        },
        propertyId: {
            type: GraphQLString
        }
    }
});

export const InputPropertyQualifier = new GraphQLInputObjectType({
    name: 'InputPropertyQualifier',
    fields:
    {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        value: {
            type: new GraphQLNonNull(GraphQLString)
        },
        type: {
            type: new GraphQLNonNull(ValueType)
        }
    }
});


export const InputWikiEntity = new GraphQLInputObjectType({
    name: 'InputWikiEntity',
    fields:
    {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        lang: {
            type: new GraphQLNonNull(GraphQLString)
        },
        label: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: GraphQLString
        },
        aliases: {
            type: new GraphQLList(GraphQLString)
        },
        props: {
            type: GraphQLJsonType
        },
        types: {
            type: new GraphQLList(GraphQLString)
        },
        pageTitle: {
            type: GraphQLString
        },
        extract: {
            type: GraphQLString
        },
        slug: {
            type: GraphQLString
        },
        countQuizItems: {
            type: GraphQLInt
        },
        countQuizzes: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        }
    }
});

export const InputPropertyValue = new GraphQLInputObjectType({
    name: 'InputPropertyValue',
    fields:
    {
        entity: {
            type: InputWikiEntity
        },
        value: {
            type: new GraphQLNonNull(GraphQLString)
        },
        type: {
            type: new GraphQLNonNull(ValueType)
        }
    }
});


export const InputQuizItem = new GraphQLInputObjectType({
    name: 'InputQuizItem',
    fields:
    {
        id: {
            type: GraphQLString
        },
        lang: {
            type: new GraphQLNonNull(GraphQLString)
        },
        entity: {
            type: InputWikiEntity
        },
        description: {
            type: GraphQLString
        },
        propertyId: {
            type: GraphQLString
        },
        value: {
            type: InputPropertyValue
        },
        qualifier: {
            type: InputPropertyQualifier
        },
        title: {
            type: GraphQLString
        },
        question: {
            type: GraphQLString
        },
        image: {
            type: InputImage
        },
        topics: {
            type: new GraphQLList(InputWikiEntity)
        }
    }
});
