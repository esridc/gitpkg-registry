
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./nestjs-hub-logger-service.cjs.production.min.js')
} else {
  module.exports = require('./nestjs-hub-logger-service.cjs.development.js')
}
