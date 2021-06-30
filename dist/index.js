
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./nestjs-hub-health-check.cjs.production.min.js')
} else {
  module.exports = require('./nestjs-hub-health-check.cjs.development.js')
}
