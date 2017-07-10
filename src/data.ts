
// import { Promise } from './utils';
import { logger } from './logger';
import { QuizCreate, QuizUpdate, QuizAddQuizItem, QuizRemoveQuizItem, QuizItemCreate, QuizItemUpdate, EntityCreate, EntityUpdate, GetByIdUseCase } from 'quizar-domain';
import { createDbConnection, WikiEntityRepository, QuizItemRepository, QuizRepository } from 'quizar-data-mongo';

const connection = createDbConnection(process.env.QUIZAR_DB_CONNECTION);
const wikiEntityRepository = new WikiEntityRepository(connection);
const quizRepository = new QuizRepository(connection);
const quizItemRepository = new QuizItemRepository(connection);

export const entityUseCases = {
    create: new EntityCreate(wikiEntityRepository),
    update: new EntityUpdate(wikiEntityRepository),
    getById: new GetByIdUseCase('EntityGetById', wikiEntityRepository)
};

export const quizItemUseCases = {
    create: new QuizItemCreate(quizItemRepository, entityUseCases.create, entityUseCases.update),
    update: new QuizItemUpdate(quizItemRepository, entityUseCases.create, entityUseCases.update),
    getById: new GetByIdUseCase('QuizItemGetById', quizItemRepository)
};

const quizUpdate = new QuizUpdate(quizRepository, quizItemRepository, entityUseCases.create, entityUseCases.update);

export const quizUseCases = {
    create: new QuizCreate(quizRepository, quizItemRepository, entityUseCases.create, entityUseCases.update),
    update: quizUpdate,
    addQuizItem: new QuizAddQuizItem(quizRepository, quizUpdate),
    removeQuizItem: new QuizRemoveQuizItem(quizRepository, quizUpdate),
    getById: new GetByIdUseCase('QuizGetById', quizRepository)
};
