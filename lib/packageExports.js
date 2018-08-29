'use strict'

const isEqual = require('lodash/isEqual')
const difference = require('lodash/difference')
const intersection = require('lodash/intersection')

const packageExports = (pkg, methodList) => {
    const fptiMethods = [
        'stations.all',
        'stations.nearby',
        'stations.search',
        'stops.all',
        'stops.nearby',
        'stops.search',
        'regions.all',
        'regions.nearby',
        'regions.search',
        'stopovers',
        'journeys'
    ]
    const exposedMethods = []

    if (pkg.stations && pkg.stations.all) {
        if (typeof pkg.stations.all !== 'function') throw new Error('Module.stations.all must be a function.')
        exposedMethods.push('stations.all')
    }
    if (pkg.stations && pkg.stations.nearby) {
        if (typeof pkg.stations.nearby !== 'function') throw new Error('Module.stations.nearby must be a function.')
        exposedMethods.push('stations.nearby')
    }
    if (pkg.stations && pkg.stations.search) {
        if (typeof pkg.stations.search !== 'function') throw new Error('Module.stations.search must be a function.')
        exposedMethods.push('stations.search')
    }

    if (pkg.stops && pkg.stops.all) {
        if (typeof pkg.stops.all !== 'function') throw new Error('Module.stops.all must be a function.')
        exposedMethods.push('stops.all')
    }
    if (pkg.stops && pkg.stops.nearby) {
        if (typeof pkg.stops.nearby !== 'function') throw new Error('Module.stops.nearby must be a function.')
        exposedMethods.push('stops.nearby')
    }
    if (pkg.stops && pkg.stops.search) {
        if (typeof pkg.stops.search !== 'function') throw new Error('Module.stops.search must be a function.')
        exposedMethods.push('stops.search')
    }

    if (pkg.regions && pkg.regions.all) {
        if (typeof pkg.regions.all !== 'function') throw new Error('Module.regions.all must be a function.')
        exposedMethods.push('regions.all')
    }
    if (pkg.regions && pkg.regions.nearby) {
        if (typeof pkg.regions.nearby !== 'function') throw new Error('Module.regions.nearby must be a function.')
        exposedMethods.push('regions.nearby')
    }
    if (pkg.regions && pkg.regions.search) {
        if (typeof pkg.regions.search !== 'function') throw new Error('Module.regions.search must be a function.')
        exposedMethods.push('regions.search')
    }

    if (pkg.stopovers) {
        if (typeof pkg.stopovers !== 'function') throw new Error('Module.stopovers must be a function.')
        exposedMethods.push('stopovers')
    }
    if (pkg.journeys) {
        if (typeof pkg.journeys !== 'function') throw new Error('Module.journeys must be a function.')
        exposedMethods.push('journeys')
    }

    if (exposedMethods.length === 0) throw new Error('Module must expose at least one FPTI method.')
    if (!isEqual(methodList.sort(), exposedMethods.sort())) throw new Error('Module exports don\'t match methods specified as expected in fpti-tests.packageExports.')

    const otherMethods = difference(methodList, exposedMethods)
    if (intersection(otherMethods, fptiMethods).length > 0) throw new Error('Module exports other methods using reserved FPTI method names.')

    return true
}

module.exports = packageExports
