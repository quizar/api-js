
require('dotenv').config();

require('./data');
import * as express from 'express';
import { logger } from './logger';
import { schema } from './graphql';

const graphqlHTTP = require('express-graphql');
const isProduction = process.env.NODE_ENV === 'production';

const server = express();

server.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: !isProduction
}));

server.listen(process.env.PORT, () => {
    logger.warn('Listening at %s', process.env.PORT);
});

process.on('unhandledRejection', function (error) {
    logger.error('unhandledRejection: ' + error.message, error);
});

process.on('uncaughtException', function (error) {
    logger.error('uncaughtException: ' + error.message, error);
});
