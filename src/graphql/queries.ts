
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';
import { entityUseCases, quizUseCases, quizItemUseCases } from '../data';
import { logger } from '../logger';
import { WikiEntity, QuizItem } from './types';
import { } from './inputs';

export const queries = {
    getWikiEntity: {
        type: WikiEntity,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(source, args: { id: string }, context) {
            return entityUseCases.getById(args.id);
        }
    },
    getQuizItem: {
        type: QuizItem,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(source, args: { id: string }, context) {
            return quizItemUseCases.getById(args.id);
        }
    }
};
