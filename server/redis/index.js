let client

const createClient = () => {
  const { redis: config } = require('../../config')
  const logger = require('../utils/logger')
  const bluebird = require('bluebird')
  const redis = require('redis')

  bluebird.promisifyAll(redis.RedisClient.prototype)
  bluebird.promisifyAll(redis.Multi.prototype)
  logger.info(`Starting redis client with following configs: ${JSON.stringify(config)}!`, { scope: 'redis' })
  client = redis.createClient(config)

  client.on('error', logger.error)
  return client
}

module.exports = {
  get client () {
    return client || createClient()
  }
}
