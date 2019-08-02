const redis = require('../../server/redis')
const sinon = require('sinon')
const sandbox = sinon.createSandbox()
const bluebird = require('bluebird')
const redisMock = require('redis-mock')

let client

const stub = () => {
  sandbox.stub(redis, 'client').get(() => client || createClient())
}

const flush = async () => {
  await client.flushallAsync()
}

const restore = async () => {
  sandbox.restore()
  await client.flushallAsync()
}

const createClient = () => {
  bluebird.promisifyAll(redisMock.RedisClient.prototype)
  bluebird.promisifyAll(redisMock.Multi.prototype)
  client = redisMock.createClient()

  return client
}

module.exports = {
  stub,
  flush,
  restore,
  get client () { return client || createClient() }
}
