# fpti-tests

This package provides a collection of validator/test methods for [FPTI-JS](https://github.com/juliuste/fpti-js) (Friendly Public Transport Interface) modules.

[![npm version](https://img.shields.io/npm/v/fpti-tests.svg)](https://www.npmjs.com/package/fpti-tests)
[![Build Status](https://travis-ci.org/juliuste/fpti-tests.svg?branch=master)](https://travis-ci.org/juliuste/fpti-tests)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/fpti-tests.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/juliuste/fpti-tests.svg)](https://david-dm.org/juliuste/fpti-tests)
[![license](https://img.shields.io/github/license/juliuste/fpti-tests.svg?style=flat)](license)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation

```shell
npm install fpti-tests
```

## API

### General methods

These two methods should be used in every package.

#### `packageJson(pkg)`

Takes the contents of your package's `package.json` and returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise). Throws if the given package.json is invalid. Will check the version of `validate-fptf` used by your module.

```js
const tests = require('fpti-tests')
const pkg = require('./package.json') // your-package/package.json

const test = async () => {
    await tests.packageJson(pkg) // throws when invalid
}
```

#### `packageExports(module, expectedMethods)`

Takes the `module.exports` of your module and a list of supported FPTI methods. Throws if `expectedMethods` doesn't match the module's exports or if the module structure is invalid.

```js
const tests = require('fpti-tests')
const module = require('.') // your-package

const test = () => {
    tests.packageExports(module, ['stations.all', 'stops.nearby', 'stopovers']) // throws when invalid
}
```

### Feature check methods

Use those for the FPTI methods exposed by your module: Check if the `features` object exported by your FPTI methods matches the spec and a given list of `expected` options.

Example for the `stopovers` method:

```js
const tests = require('fpti-tests')
const stopoversFeatures = require('.').stopovers.features // your-package

const test = () => {
    tests.stopoversFeatures(stopoversFeatures, ['interval', 'when', 'departureAfter', 'results', 'direction']) // throws when invalid, given a list of expected options
}
```

All methods:

- `stationsAllFeatures(features, expectedList)`
- `stationsNearbyFeatures(features, expectedList)`
- `stationsSearchFeatures(features, expectedList)`
- `stopsAllFeatures(features, expectedList)`
- `stopsNearbyFeatures(features, expectedList)`
- `stopsSearchFeatures(features, expectedList)`
- `regionsAllFeatures(features, expectedList)`
- `regionsNearbyFeatures(features, expectedList)`
- `regionsSearchFeatures(features, expectedList)`
- `stopoversFeatures(features, expectedList)`
- `journeysFeatures(features, expectedList)`

## Contributing

If you found a bug or want to propose a feature, feel free to visit [the issues page](https://github.com/juliuste/fpti-tests/issues).
