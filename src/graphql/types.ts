
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLEnumType } from 'graphql';
import { ValueType } from './common';

import { entityUseCases, quizUseCases, quizItemUseCases } from '../data';
import { logger } from '../logger';
import { PropertyValueType } from 'quizar-domain';

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
        type: {
            type: new GraphQLNonNull(ValueType)
        },
        value: {
            type: new GraphQLNonNull(GraphQLString)
        },
        entity: {
            type: WikiEntity,
            resolve(source, args, context, info) {
                console.log('get PropertyValue entity source', source);
                console.log('get PropertyValue entity info', info);
                if (source.type === PropertyValueType.ENTITY) {
                    return entityUseCases.getById(source.value);
                }
                return null;
            }
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
            type: WikiEntity,
            resolve(source, args, context, info) {
                // console.log('get QuizItem entity source', source);
                // console.log('get QuizItem entity info', info.fieldNodes[0].selectionSet.selections);
                if (source.entity && source.entity.id && info.fieldNodes[0].selectionSet.selections.length > 1) {
                    return entityUseCases.getById(source.entity.id);
                }
                return source.entity;
            }
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
