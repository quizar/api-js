
// import { Promise } from './utils';
import { logger } from './logger';
import { QuizUseCases, QuizItemUseCases, WikiEntityUseCases } from 'quizar-domain';
import { createDbConnection, WikiEntityRepository, QuizItemRepository, QuizRepository } from 'quizar-data-mongo';

const connection = createDbConnection(process.env.QUIZAR_DB_CONNECTION);
const wikiEntityRepository = new WikiEntityRepository(connection);
const quizRepository = new QuizRepository(connection);
const quizItemRepository = new QuizItemRepository(connection);

export const entityUseCases = new WikiEntityUseCases(wikiEntityRepository);
export const quizItemUseCases = new QuizItemUseCases(quizItemRepository, entityUseCases);
export const quizUseCases = new QuizUseCases(quizRepository, entityUseCases);
