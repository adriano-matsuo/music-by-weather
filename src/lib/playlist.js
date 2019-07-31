const openWeatherApi = require('../../server/api/openWeather')
const spotifyApi = require('../../server/api/spotify')
const helper = require('../utils/helper')
const redis = require('../../server/redis')
const { redis: config } = require('../../config')

const getWeather = async (city) => {
  const redisClient = redis.client
  const KEY = `WEATHER_${city}`

  let weather = await redisClient.getAsync(KEY)
  if (weather) {
    return JSON.parse(weather)
  }

  weather = await openWeatherApi.getWeather(city)
  redisClient.setAsync(KEY, JSON.stringify(weather), 'EX', config.openWeather.timeout)

  return weather
}

const getTracks = async (genre) => {
  const redisClient = redis.client
  const KEY = `TRACKS_${genre}`

  let tracks = await redisClient.getAsync(KEY)
  if (tracks) {
    return JSON.parse(tracks)
  }

  tracks = await spotifyApi.getRecommendations(genre)
  redisClient.setAsync(KEY, JSON.stringify(tracks), 'EX', config.spotify.timeout)

  return tracks
}

/**
 * @module lib/playlist
 * @method [lib/playlist] get
 * @description Returns a playlist by city
 * @param  {String} city City name
 * @returns {object} Object containing the city, weather and playlist
 */
const get = async (city) => {
  const weather = await getWeather(city)
  const temperature = weather.main.temp
  const genre = helper.getGenre(temperature)
  let tracks = await getTracks(genre)
  tracks = helper.parseTracks(tracks)

  const playlist = {
    city: weather.name,
    temperature,
    genre,
    tracks
  }

  return playlist
}

module.exports = { get }
