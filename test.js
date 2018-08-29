'use strict'

const tape = require('tape')
const tests = require('./index')

tape('fptf-tests.packageJson', async (t) => {
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

tape('fptf-tests.packageExports', (t) => {
	const package1 = {
		journeys: () => 1,
		stations: {
			all: () => 1,
			nearby: () => 1
		}
	}
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
	const package3 = {
		journeys: () => 1,
		stopovers: 1
	}
	const package4 = {
		otherMethod: 1
	}

	t.ok(tests.packageExports(package1, ['journeys', 'stations.all', 'stations.nearby']))
	t.throws(() => tests.packageExports(package1, ['journeys', 'stations.nearby']))
	t.throws(() => tests.packageExports(package1, ['journeys', 'stations.nearby', 'stations.all', 'stopovers']))

	t.ok(tests.packageExports(package2, ['journeys', 'regions.all', 'stops.nearby']))

	t.throws(() => tests.packageExports(package3, ['journeys', 'stopovers']))
	t.throws(() => tests.packageExports(package3, ['journeys']))

	t.throws(() => tests.packageExports(package4, ['stations.all']))
	t.throws(() => tests.packageExports(package4, []))

	t.end()
})
