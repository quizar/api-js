
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLEnumType } from 'graphql';
import { ValueType, QuizTargetType, WikiEntityType, getSelectFields } from './common';

import { entityUseCases, quizUseCases, quizItemUseCases } from '../data';
import { logger } from '../logger';
import { PropertyValueType, isEntityId } from 'quizar-domain';

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

export const WikiEntity = new GraphQLObjectType({
    name: 'WikiEntity',
    fields:
    {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        lang: {
            type: GraphQLString
        },
        label: {
            type: GraphQLString
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
        type: {
            type: WikiEntityType
        },
        types: {
            type: new GraphQLList(GraphQLString)
        },
        pageTitle: {
            type: GraphQLString
        },
        pageId: {
            type: GraphQLInt
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
        },
        cc2: {
            type: GraphQLString
        },
        rank: {
            type: GraphQLInt
        }
    }
});

export const EntityPropertyValueQualifier = new GraphQLObjectType({
    name: 'EntityPropertyValueQualifier',
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
        },
        entity: {
            type: WikiEntity,
            resolve(source, args, context, info) {
                console.log('get EntityPropertyValueQualifier entity source', source);
                // console.log('get WikiProperty entity info', info);
                if (isEntityId(source.value) && info.fieldNodes[0].selectionSet.selections.length > 1) {
                    return entityUseCases.getById(source.value, { fields: getSelectFields(info.fieldNodes[0].selectionSet, ['id']) });
                }
                return null;
            }
        }
    }
});

export const EntityPropertyValue = new GraphQLObjectType({
    name: 'EntityPropertyValue',
    fields:
    {
        value: {
            type: new GraphQLNonNull(GraphQLString)
        },
        entity: {
            type: WikiEntity,
            resolve(source, args, context, info) {
                console.log('get EntityPropertyValue entity source', source);
                // console.log('get WikiProperty entity info', info);
                if (isEntityId(source.value) && info.fieldNodes[0].selectionSet.selections.length > 1) {
                    return entityUseCases.getById(source.value, { fields: getSelectFields(info.fieldNodes[0].selectionSet, ['id']) });
                }
                return null;
            }
        },
        qualifiers: {
            type: new GraphQLList(EntityPropertyValueQualifier)
        }
    }
});

export const EntityProperty = new GraphQLObjectType({
    name: 'EntityProperty',
    fields:
    {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        type: {
            type: ValueType
        },
        values: {
            type: new GraphQLList(EntityPropertyValue)
        },
        entity: {
            type: WikiEntity,
            resolve(source, args, context, info) {
                console.log('get WikiProperty entity source', source);
                // console.log('get WikiProperty entity info', info);
                if (isEntityId(source.value) && info.fieldNodes[0].selectionSet.selections.length > 1) {
                    return entityUseCases.getById(source.value, { fields: getSelectFields(info.fieldNodes[0].selectionSet, ['id']) });
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
                if (source.entity && source.entity.id && info.fieldNodes[0].selectionSet.selections.length > 1) {
                    return entityUseCases.getById(source.entity.id, { fields: getSelectFields(info.fieldNodes[0].selectionSet, ['id']) });
                }
                return source.entity;
            }
        },
        description: {
            type: GraphQLString
        },
        property: {
            type: EntityProperty
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

export const QuizItemInfo = new GraphQLObjectType({
    name: 'QuizItemInfo',
    fields:
    {
        order: {
            type: GraphQLInt
        },
        item: {
            type: new GraphQLNonNull(QuizItem)
        },
        target: {
            type: QuizTargetType
        },
        question: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        image: {
            type: Image
        }
    }
});

export const Quiz = new GraphQLObjectType({
    name: 'Quiz',
    fields:
    {
        id: {
            type: GraphQLString
        },
        lang: {
            type: GraphQLString
        },
        target: {
            type: QuizTargetType
        },
        question: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        image: {
            type: Image
        },
        topics: {
            type: new GraphQLList(WikiEntity)
        },
        items: {
            type: new GraphQLList(QuizItemInfo)
        }
    }
});
