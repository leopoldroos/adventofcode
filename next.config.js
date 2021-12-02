const nowDate = new Date()
const buildTimestamp = nowDate.getTime()
const buildId = process.env.BUILD_ID || 'BUILD_ID not defined in this env'
const publishVersion = process.env.npm_package_version
const commitRef = process.env.COMMIT_REF || 'COMMIT_REF not defined in this env'

module.exports = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL,
    originUrl: process.env.ORIGIN_URL,
    buildTimestamp,
    buildId,
    buildHash: process.env.BUILD_SHA1,
    publishVersion,
    commitRef,
  },
}
