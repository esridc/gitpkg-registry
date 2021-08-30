
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./hub-logger.cjs.production.min.js')
} else {
  module.exports = require('./hub-logger.cjs.development.js')
}
