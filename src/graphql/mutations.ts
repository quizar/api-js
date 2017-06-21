
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLBoolean } from 'graphql';
import { entityUseCases, quizUseCases, quizItemUseCases } from '../data';
import { logger } from '../logger';
import { InputWikiEntity } from './inputs';
import { WikiEntity } from './types';
import { RequestContextType } from '../utils';

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
            return entityUseCases.create(args.data);
        }
    }
};
