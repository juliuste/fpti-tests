'use strict'

const intersection = require('lodash/intersection')
const isObject = require('lodash/isObject')
const isEqual = require('lodash/isEqual')
const isString = require('lodash/isString')

const _allFeatures = {}
const _nearbyFeatures = {
    results: true,
    distance: false
}
const _searchFeatures = {
    results: true
}
const stopoversFeatures = {
    when: true,
    results: true,
    interval: true,
    departureAfter: true,
    arrivalBefore: false,
    direction: false
}
const journeysFeatures = {
    when: true,
    results: true,
    interval: true,
    departureAfter: true,
    transfers: true,
    arrivalBefore: false,
    via: false,
    currency: false
}

const validFeaturesObject = (f) => isObject(f) && Object.values(f).every(x => isString(x) && x.length > 0)
const compareFeatures = (features, expected, spec, method) => {
    if (!validFeaturesObject(features)) throw new Error(`${method}.features must be an object containing non-empty text values (descriptions) for every key.`)

    const requiredSpec = Object.keys(spec).filter(k => !!spec[k])
    if (intersection(requiredSpec, Object.keys(features)).length !== requiredSpec.length) throw new Error(`${method}.features does not contain all required features for this method.`)

    const usedFeatures = intersection(Object.keys(spec), Object.keys(features))
    if (!isEqual(usedFeatures.sort(), expected.sort())) throw new Error(`Module exposes features not expected in fpti-tests.${method}.features.`)

    return true
}

module.exports = {
    stationsAllFeatures: (features, expected) => compareFeatures(features, expected, _allFeatures, 'stations.all'),
    stationsNearbyFeatures: (features, expected) => compareFeatures(features, expected, _nearbyFeatures, 'stations.nearby'),
    stationsSearchFeatures: (features, expected) => compareFeatures(features, expected, _searchFeatures, 'stations.search'),
    stopsAllFeatures: (features, expected) => compareFeatures(features, expected, _allFeatures, 'stops.all'),
    stopsNearbyFeatures: (features, expected) => compareFeatures(features, expected, _nearbyFeatures, 'stops.nearby'),
    stopsSearchFeatures: (features, expected) => compareFeatures(features, expected, _searchFeatures, 'stops.search'),
    regionsAllFeatures: (features, expected) => compareFeatures(features, expected, _allFeatures, 'regions.all'),
    regionsNearbyFeatures: (features, expected) => compareFeatures(features, expected, _nearbyFeatures, 'regions.nearby'),
    regionsSearchFeatures: (features, expected) => compareFeatures(features, expected, _searchFeatures, 'regions.search'),
    stopoversFeatures: (features, expected) => compareFeatures(features, expected, stopoversFeatures, 'stopovers'),
    journeysFeatures: (features, expected) => compareFeatures(features, expected, journeysFeatures, 'journeys')
}
