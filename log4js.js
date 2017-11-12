var log4js = require('log4js');
log4js.configure({
  appenders: {
    fileappender: { type: 'dateFile', filename: 'server.log', pattern: "-yyyy-MM-dd", alwaysIncludePattern: true },
    consoleappender: { type: 'console' }
  },
  categories: { default: { appenders: ['fileappender', 'consoleappender'], level: 'debug' } }
});

var logger = log4js.getLogger('server');
module.exports = {
  logger: logger
}