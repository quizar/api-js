
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLBoolean } from 'graphql';
import { entityUseCases, quizUseCases, quizItemUseCases } from '../data';
import { logger } from '../logger';
import { InputWikiEntity, InputQuizItem } from './inputs';
import { WikiEntity, QuizItem } from './types';
import { RequestContextType, Bluebird } from '../utils';

export const mutations = {
    createWikiEntity: {
        type: WikiEntity,
        args: {
            data: {
                type: new GraphQLNonNull(InputWikiEntity)
            }
        },
        resolve(source, args: { data }, context: RequestContextType) {
            logger.info('createWikiEntity', args);
            // args.data.userId = context.user.id;
            return entityUseCases.create(args.data).catch(e => {
                console.log('error data', e.data);
                return Bluebird.reject(e);
            })
        }
    },
    createQuizItem: {
        type: QuizItem,
        args: {
            data: {
                type: new GraphQLNonNull(InputQuizItem)
            }
        },
        resolve(source, args: { data }, context: RequestContextType) {
            logger.info('createQuizItem', args);
            // args.data.userId = context.user.id;
            return quizItemUseCases.create(args.data).catch(e => {
                console.log('error data', e.data);
                return Bluebird.reject(e);
            })
        }
    }
};
