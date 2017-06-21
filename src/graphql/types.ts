
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLEnumType } from 'graphql';
import { ValueType } from './common';

const GraphQLJsonType = require('graphql-type-json');

export const Image = new GraphQLObjectType({
    name: 'Image',
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

export const PropertyQualifier = new GraphQLObjectType({
    name: 'PropertyQualifier',
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


export const WikiEntity = new GraphQLObjectType({
    name: 'WikiEntity',
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

export const PropertyValue = new GraphQLObjectType({
    name: 'PropertyValue',
    fields:
    {
        entity: {
            type: WikiEntity
        },
        value: {
            type: new GraphQLNonNull(GraphQLString)
        },
        type: {
            type: new GraphQLNonNull(ValueType)
        }
    }
});

export const QuizItem = new GraphQLObjectType({
    name: 'QuizItem',
    fields:
    {
        id: {
            type: GraphQLString
        },
        lang: {
            type: new GraphQLNonNull(GraphQLString)
        },
        entity: {
            type: WikiEntity
        },
        description: {
            type: GraphQLString
        },
        propertyId: {
            type: GraphQLString
        },
        value: {
            type: PropertyValue
        },
        qualifier: {
            type: PropertyQualifier
        },
        title: {
            type: GraphQLString
        },
        question: {
            type: GraphQLString
        },
        image: {
            type: Image
        },
        topics: {
            type: new GraphQLList(WikiEntity)
        }
    }
});
