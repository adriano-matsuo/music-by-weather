const openWeatherApi = require('../../server/api/openWeather')

/**
 * @module lib/playlist
 * @method [lib/playlist] get
 * @description Returns a playlist by city
 * @param  {String} city City name
 * @returns {object} Object containing the city, weather and playlist
 */
const get = async (city) => {
  const weatherData = await openWeatherApi.getWeather(city)
  const temperature = weatherData.main.temp
  city = weatherData.name

  const playlist = {
    city,
    temperature,
    playlist: []
  }

  return playlist
}

module.exports = { get }
