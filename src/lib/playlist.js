const openWeatherApi = require('../../server/api/openWeather')
const spotifyApi = require('../../server/api/spotify')
const helper = require('../utils/helper')

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
  const genre = helper.getGenre(temperature)

  const recommendations = await spotifyApi.getRecommendations(genre)
  const tracks = helper.parseTracks(recommendations.tracks)

  const playlist = {
    city: weatherData.name,
    temperature,
    genre,
    tracks
  }

  return playlist
}

module.exports = { get }
