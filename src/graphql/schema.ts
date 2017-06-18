
import { GraphQLScalarType, buildSchema } from 'graphql';

export const JsonScalarType = new GraphQLScalarType({
    name: 'JSON',
    description: 'JSON type',
    parseValue(value) {
        return JSON.parse(value); // value from the client
    },
    serialize(value) {
        return value;
    },
    parseLiteral(ast) {
        return null;
    }
});

export const schema = buildSchema(`
scalar JSON

type Image {
    data: String
    propertyId: String
}

input InputImage {
    data: String!
    propertyId: String!
}

type PropertyQualifier {
    id: String
    value: String
    type: String
}

input InputPropertyQualifier {
    id: String!
    value: String!
    type: String!
}

type PropertyValue {
    type: String
    value: String
    entity: WikiEntity
}

input InputPropertyValue {
    type: String!
    value: String!
    entity: InputWikiEntity
}

type WikiEntity {
    id: String
    lang: String
    label: String
    description: String
    aliases: [String]
    props: JSON
    types: [String]
    pageTitle: String
    extract: String
    slug: String
    countQuizItems: Int
    countQuizzes: Int
    name: String
}

input InputWikiEntity {
    id: String!
    lang: String!
    label: String!
    description: String
    aliases: [String]
    props: JSON
    types: [String]
    pageTitle: String
    extract: String
    slug: String
    countQuizItems: Int
    countQuizzes: Int
    name: String
}

type QuizItem {
    id: String
    entity: WikiEntity
    propertyId: String
    value: PropertyValue
    qualifier: PropertyQualifier
    lang: String
    title: String
    question: String
    description: String
    image: Image
    topics: [WikiEntity]
}

input InputQuizItem {
    id: String
    entity: InputWikiEntity!
    propertyId: String!
    value: InputPropertyValue!
    qualifier: InputPropertyQualifier
    lang: String!
    title: String
    question: String
    description: String
    image: InputImage
    topics: [InputWikiEntity]
}

type Query {
    entity(id: String!): WikiEntity
    quizItem(id: String): QuizItem
}

type Mutation {
    createQuizItem(data: InputQuizItem!): QuizItem
}

schema {
    query: Query,
    mutation: Mutation
}`);
