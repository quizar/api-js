
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';
import { entityUseCases, quizUseCases, quizItemUseCases } from '../data';
import { logger } from '../logger';
import { WikiEntity, QuizItem } from './types';
import { } from './inputs';
import { getSelectFields } from './common';

export const queries = {
    entityGetById: {
        type: WikiEntity,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(source, args: { id: string }, context, info) {
            return entityUseCases.getById.execute(args.id, { fields: getSelectFields(info.fieldNodes[0].selectionSet) });
        }
    },
    quizItemGetById: {
        type: QuizItem,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(source, args: { id: string }, context, info) {
            const fields = getSelectFields(info.fieldNodes[0].selectionSet, ['entity.id', 'property.value', 'qualifier.value']);
            console.log('fields', fields);
            return quizItemUseCases.getById.execute(args.id, { fields: fields }).then(result=>{
                console.log(result);
                return result;
            });
        }
    }
};
