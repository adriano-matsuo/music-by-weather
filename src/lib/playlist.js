/**
 * @module lib/playlist
 * @method [lib/playlist] get
 * @description Returns a playlist by city
 * @param  {String} city City name
 * @returns {object} Object containing the city, weather and playlist
 */
const get = async (city) => {
  const playlist = {
    city,
    weather: {},
    playlist: []
  }

  return playlist
}

module.exports = { get }
