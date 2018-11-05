'use strict'

const packageJson = require('./lib/packageJson')
const packageExports = require('./lib/packageExports')
const features = require('./lib/features')

module.exports = {packageJson, packageExports, ...features}
