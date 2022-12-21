
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./topopass.cjs.production.min.js')
} else {
  module.exports = require('./topopass.cjs.development.js')
}
