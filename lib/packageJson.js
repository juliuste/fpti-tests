'use strict'

const packageInfo = require('package-json')
const semverDiff = require('semver-diff')

const packageJson = async (pkg) => {
    const validateFPTFVersion = (pkg.dependencies || {})['validate-fptf'] || (pkg.devDependencies || {})['validate-fptf']
    if (!validateFPTFVersion) throw new Error('Module must require validate-fptf.')

    const validateFPTFInfo = await packageInfo('validate-fptf', {
        version: validateFPTFVersion,
        fullMetadata: true
    })
    const fptfVersion = validateFPTFInfo.fptf
    if (!fptfVersion) throw new Error('Module uses an invalid version of validate-fptf: fptf attribute missing in package.json.')
    if (semverDiff('1.0.0', fptfVersion) === 'major') throw new Error('Module must provide data in FPTF@1, validate-fptf dependency specifies a different version.')

    return true
}

module.exports = packageJson
