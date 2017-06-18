
import { entityUseCases, quizUseCases, quizItemUseCases } from '../data';
import { QuizItem, WikiEntity } from 'quizar-domain';

export const rootValue = {
    Query: {
        entity(id: string) {
            return entityUseCases.getById(id);
        },
        quizItem(id: string) {
            return quizItemUseCases.getById(id);
        }
    },

    Mutation: {
        createQuizItem(data: QuizItem) {
            console.log('creating quiz item', data);
            return quizItemUseCases.create(data).catch(error => {
                console.log(error);
            })
        }
    }
};
