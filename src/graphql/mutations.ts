
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLBoolean } from 'graphql';
import { entityUseCases, quizUseCases, quizItemUseCases } from '../data';
import { logger } from '../logger';
import { InputWikiEntity, InputQuizItem, InputQuiz, InputQuizItemInfo } from './inputs';
import { WikiEntity, QuizItem, Quiz, QuizItemInfo } from './types';
import { RequestContextType, Bluebird } from '../utils';

export const mutations = {
    // createWikiEntity: {
    //     type: WikiEntity,
    //     args: {
    //         data: {
    //             type: new GraphQLNonNull(InputWikiEntity)
    //         }
    //     },
    //     resolve(source, args: { data }, context: RequestContextType) {
    //         logger.info('createWikiEntity', args);
    //         // args.data.userId = context.user.id;
    //         return entityUseCases.create(args.data).catch(e => {
    //             console.log('error data', e.data);
    //             return Bluebird.reject(e);
    //         })
    //     }
    // },
    quizItemCreate: {
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
    },
    quizItemUpdate: {
        type: QuizItem,
        args: {
            data: {
                type: new GraphQLNonNull(InputQuizItem)
            }
        },
        resolve(source, args: { data }, context: RequestContextType) {
            logger.info('updateQuizItem', args);
            // args.data.userId = context.user.id;
            return quizItemUseCases.update(args.data).catch(e => {
                console.log('error data', e.data);
                return Bluebird.reject(e);
            })
        }
    },
    quizCreate: {
        type: Quiz,
        args: {
            data: {
                type: new GraphQLNonNull(InputQuiz)
            }
        },
        resolve(source, args: { data }, context: RequestContextType) {
            logger.info('createQuiz', args);
            // args.data.userId = context.user.id;
            return quizUseCases.create(args.data).catch(e => {
                console.log('error data', e.data);
                return Bluebird.reject(e);
            })
        }
    },
    quizUpdate: {
        type: Quiz,
        args: {
            data: {
                type: new GraphQLNonNull(InputQuiz)
            }
        },
        resolve(source, args: { data }, context: RequestContextType) {
            logger.info('updateQuiz', args);
            // args.data.userId = context.user.id;
            return quizUseCases.update(args.data).catch(e => {
                console.log('error data', e.data);
                return Bluebird.reject(e);
            })
        }
    },
    quizAddQuizItemInfo: {
        type: QuizItemInfo,
        args: {
            quizId: {
                type: new GraphQLNonNull(GraphQLString)
            },
            data: {
                type: new GraphQLNonNull(InputQuizItemInfo)
            }
        },
        resolve(source, args: { quizId, data }, context: RequestContextType) {
            logger.info('quizAddQuizItemInfo', args);
            // args.data.userId = context.user.id;
            return quizUseCases.addQuizItemInfo(args.quizId, args.data).catch(e => {
                console.log('error data', e.data);
                return Bluebird.reject(e);
            })
        }
    },
    quizRemoveQuizItemInfo: {
        type: QuizItemInfo,
        args: {
            quizId: {
                type: new GraphQLNonNull(GraphQLString)
            },
            quizItemId: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(source, args: { quizId, quizItemId }, context: RequestContextType) {
            logger.info('quizRemoveQuizItemInfo', args);
            // args.data.userId = context.user.id;
            return quizUseCases.removeQuizItemInfo(args.quizId, args.quizItemId).catch(e => {
                console.log('error data', e.data);
                return Bluebird.reject(e);
            })
        }
    }
};
