'use strict'

const tape = require('tape')
const tests = require('./index')

tape('fpti-tests.packageJson', async (t) => {
	const validPackage1 = {
		dependencies: {
			'validate-fptf': '2.1.1'
		}
	}
	const validPackage2 = {
		devDependencies: {
			'validate-fptf': '2.1.1'
		}
	}
	const invalidPackage1 = {}
	const invalidPackage2 = {dependencies: {
		'validate-fptf': '0.0.0'
	}}

	await tests.packageJson(validPackage1).then(() => t.pass()).catch(() => t.fail())
	await tests.packageJson(validPackage1).then(() => t.pass()).catch(() => t.fail())
	await tests.packageJson(invalidPackage1).then(() => t.fail()).catch(() => t.pass())
	await tests.packageJson(invalidPackage2).then(() => t.fail()).catch(() => t.pass())
	t.end()
})

tape('fpti-tests.packageExports', (t) => {
	const package1 = {
		journeys: () => 1,
		stations: {
			all: () => 1,
			nearby: () => 1
		}
	}
	package1.journeys.features = {}
	package1.stations.all.features = {}
	package1.stations.nearby.features = {}

	const package2 = {
		journeys: () => 1,
		stops: {
			nearby: () => 1
		},
		regions: {
			all: () => 1
		},
		otherMethod: () => 1
	}
	package2.journeys.features = {}
	package2.regions.all.features = {}
	package2.stops.nearby.features = {}

	const package3 = {
		journeys: () => 1,
		stopovers: {features: {}}
	}
	package3.journeys.features = {}

	const package4 = {
		otherMethod: 1
	}

	const package5 = {
		journeys: () => 1,
		regions: {
			search: () => 1
		}
	}
	package5.journeys.features = {}

	t.ok(tests.packageExports(package1, ['journeys', 'stations.all', 'stations.nearby']))
	t.throws(() => tests.packageExports(package1, ['journeys', 'stations.nearby']))
	t.throws(() => tests.packageExports(package1, ['journeys', 'stations.nearby', 'stations.all', 'stopovers']))

	t.ok(tests.packageExports(package2, ['journeys', 'regions.all', 'stops.nearby']))

	t.throws(() => tests.packageExports(package3, ['journeys', 'stopovers']))
	t.throws(() => tests.packageExports(package3, ['journeys']))

	t.throws(() => tests.packageExports(package4, ['stations.all']))
	t.throws(() => tests.packageExports(package4, []))

	t.throws(() => tests.packageExports(package5, ['journeys', 'regions.search']))
	package5.regions.search.features = {}
	t.ok(tests.packageExports(package5, ['journeys', 'regions.search']))

	t.end()
})

tape('fpti-tests._features', (t) => {
	const _allFeatures1 = {}
	const _allFeatures2 = {otherOption: 'description'}

	const _nearbyFeatures1 = {results: 'description'}
	const _nearbyFeatures2 = {otherOption: 'description'}
	const _nearbyFeatures3 = {results: 1}

	const _searchFeatures1 = {results: 'description'}
	const _searchFeatures2 = {otherOption: 'description'}

	const stopoversFeatures1 = {when: 'description', departureAfter: 'description', results: 'description', interval: 'description'}
	const stopoversFeatures2 = {when: 'description', otherOption: 'description'}

	const journeysFeatures1 = {when: 'description', departureAfter: 'description', results: 'description', interval: 'description', transfers: 'description'}
	const journeysFeatures2 = {when: 'description', otherOption: 'description'}

	t.ok(tests.stationsAllFeatures(_allFeatures1, []))
	t.ok(tests.stationsAllFeatures(_allFeatures2, []))
	t.ok(tests.stopsAllFeatures(_allFeatures1, []))
	t.ok(tests.stopsAllFeatures(_allFeatures2, []))
	t.ok(tests.regionsAllFeatures(_allFeatures1, []))
	t.ok(tests.regionsAllFeatures(_allFeatures2, []))

	t.ok(tests.stationsNearbyFeatures(_nearbyFeatures1, ['results']))
	t.throws(() => tests.stationsNearbyFeatures(_nearbyFeatures1, ['results', 'distance']))
	t.throws(() => tests.stationsNearbyFeatures(_nearbyFeatures2, ['results']))
	t.throws(() => tests.stationsNearbyFeatures(_nearbyFeatures2, []))
	t.throws(() => tests.stationsNearbyFeatures(_nearbyFeatures3, ['results']))
	t.ok(tests.stopsNearbyFeatures(_nearbyFeatures1, ['results']))
	t.throws(() => tests.stopsNearbyFeatures(_nearbyFeatures1, ['results', 'distance']))
	t.throws(() => tests.stopsNearbyFeatures(_nearbyFeatures2, ['results']))
	t.throws(() => tests.stopsNearbyFeatures(_nearbyFeatures2, []))
	t.ok(tests.regionsNearbyFeatures(_nearbyFeatures1, ['results']))
	t.throws(() => tests.regionsNearbyFeatures(_nearbyFeatures1, ['results', 'distance']))
	t.throws(() => tests.regionsNearbyFeatures(_nearbyFeatures2, ['results']))
	t.throws(() => tests.regionsNearbyFeatures(_nearbyFeatures2, []))

	t.ok(tests.stationsSearchFeatures(_searchFeatures1, ['results']))
	t.throws(() => tests.stationsSearchFeatures(_searchFeatures2, ['results']))
	t.throws(() => tests.stationsSearchFeatures(_searchFeatures2, []))
	t.ok(tests.stopsSearchFeatures(_searchFeatures1, ['results']))
	t.throws(() => tests.stopsSearchFeatures(_searchFeatures2, ['results']))
	t.throws(() => tests.stopsSearchFeatures(_searchFeatures2, []))
	t.ok(tests.regionsSearchFeatures(_searchFeatures1, ['results']))
	t.throws(() => tests.regionsSearchFeatures(_searchFeatures2, ['results']))
	t.throws(() => tests.regionsSearchFeatures(_searchFeatures2, []))

	t.ok(tests.stopoversFeatures(stopoversFeatures1, ['when', 'departureAfter', 'results', 'interval']))
	t.throws(() => tests.stopoversFeatures(stopoversFeatures1, ['when', 'departureAfter', 'results']))
	t.throws(() => tests.stopoversFeatures(stopoversFeatures1, ['when', 'departureAfter', 'results', 'interval', 'direction']))
	t.throws(() => tests.stopoversFeatures(stopoversFeatures2, ['when', 'departureAfter', 'results', 'interval']))
	t.throws(() => tests.stopoversFeatures(stopoversFeatures2, []))

	t.ok(tests.journeysFeatures(journeysFeatures1, ['when', 'departureAfter', 'results', 'interval', 'transfers']))
	t.throws(() => tests.journeysFeatures(journeysFeatures1, ['when', 'departureAfter', 'results', 'transfers']))
	t.throws(() => tests.journeysFeatures(journeysFeatures1, ['when', 'departureAfter', 'results', 'interval', 'transfers', 'via']))
	t.throws(() => tests.journeysFeatures(journeysFeatures2, ['when', 'departureAfter', 'results', 'interval', 'transfers']))
	t.throws(() => tests.journeysFeatures(journeysFeatures2, []))

	t.end()
})
