
export const logger = require('ournet.logger');

if (process.env.NODE_ENV === 'production') {
	logger.loggly({
		tags: ['quizar-api'],
		json: true
	});
	logger.removeConsole();
}
