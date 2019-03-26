let path = require('path')
let os = require('os')
const log4js = require('log4js')

log4js.configure({
  appenders: {
    quaty: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      category: 'default',
      filename: path.join(path.join(os.homedir(), 'QuatyClient'), 'logs', 'quaty-dog')
    }
  },
  categories: {
    default: {
      appenders: ['quaty'],
      level: 'info'
    }
  }
})

const logger = log4js.getLogger('quaty')

exports.default = {
  log: (entry) => {
    logger.info(entry)
  },
  error: (entry) => {
    logger.error(entry)
  }
}
