
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLEnumType } from 'graphql';
import { ValueType, QuizTargetType, WikiEntityType } from './common';

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

export const InputWikiEntity = new GraphQLInputObjectType({
    name: 'InputWikiEntity',
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

export const InputEntityPropertyValueQualifier = new GraphQLInputObjectType({
    name: 'InputEntityPropertyValueQualifier',
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
            type: InputWikiEntity
        }
    }
});

export const InputEntityPropertyValue = new GraphQLInputObjectType({
    name: 'InputEntityPropertyValue',
    fields:
    {
        value: {
            type: new GraphQLNonNull(GraphQLString)
        },
        entity: {
            type: InputWikiEntity
        },
        qualifiers: {
            type: new GraphQLList(InputEntityPropertyValueQualifier)
        }
    }
});

export const InputEntityProperty = new GraphQLInputObjectType({
    name: 'InputEntityProperty',
    fields:
    {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        type: {
            type: new GraphQLNonNull(ValueType)
        },
        values: {
            type: new GraphQLNonNull(new GraphQLList(InputEntityPropertyValue))
        },
        entity: {
            type: InputWikiEntity
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
            type: GraphQLString
        },
        entity: {
            type: InputWikiEntity
        },
        description: {
            type: GraphQLString
        },
        property: {
            type: InputEntityProperty
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

export const InputQuizItemInfo = new GraphQLInputObjectType({
    name: 'InputQuizItemInfo',
    fields:
    {
        order: {
            type: GraphQLInt
        },
        item: {
            type: new GraphQLNonNull(InputQuizItem)
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
            type: InputImage
        }
    }
});

export const InputQuiz = new GraphQLInputObjectType({
    name: 'InputQuiz',
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
            type: InputImage
        },
        topics: {
            type: new GraphQLList(InputWikiEntity)
        },
        items: {
            type: new GraphQLList(InputQuizItemInfo)
        }
    }
});