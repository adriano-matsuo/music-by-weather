const request = require('request')
const { openWeatherApi } = require('../../config')
const logger = require('../../server/utils/logger')

const getWeather = async (city) => {
  const { host, key } = openWeatherApi

  try {
    return new Promise((resolve, reject) => {
      request({
        url: `${host}/data/2.5/weather?q=${city},BR&units=metric&appid=${key}`,
        method: 'GET'
      }, (err, res, body) => {
        if (err || res.statusCode === 500) {
          logger.error('Error while trying attempting to retrieve OpenWeather API information', { scope: 'api:openWeather/getWeather' })
          return reject(new Error('DEFAULT'))
        }

        if (res.statusCode === 404) {
          return reject(new Error('CITY_NOT_FOUND'))
        }

        return resolve(JSON.parse(body))
      })
    })
  } catch (e) {
    return false
  }
}

module.exports = { getWeather }
