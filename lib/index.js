'use strict'

const packageJson = require('./packageJson')
const packageExports = require('./packageExports')
const features = require('./features')

module.exports = { packageJson, packageExports, ...features }
