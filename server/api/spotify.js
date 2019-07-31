const request = require('request')
const { spotifyApi } = require('../../config')
const logger = require('../../server/utils/logger')

const getToken = async () => {
  const { clientId, clientSecret } = spotifyApi

  try {
    return new Promise((resolve, reject) => {
      request({
        url: `https://accounts.spotify.com/api/token`,
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
        },
        method: 'POST',
        form: {
          grant_type: 'client_credentials'
        },
        json: true,
        rejectUnauthorized: false
      }, (err, res, body) => {
        if (err || res.statusCode === 500) {
          logger.error('Error while trying attempting to retrieve Spotify API access token', { scope: 'api:spotify/getToken' })
          return reject(new Error('DEFAULT'))
        }

        return resolve(body.access_token)
      })
    })
  } catch (e) {
    return false
  }
}

const getRecommendations = async (genre) => {
  const token = await getToken()

  try {
    return new Promise((resolve, reject) => {
      request({
        url: `https://api.spotify.com/v1/recommendations?limit=50&market=BR&seed_genres=${genre}&min_energy=0.4&min_popularity=50`,
        headers: {
          Authorization: 'Bearer ' + token
        },
        method: 'GET',
        rejectUnauthorized: false
      }, (err, res, body) => {
        if (err || res.statusCode === 500) {
          logger.error('Error while trying attempting to retrieve Spotify API recommendations', { scope: 'api:spotify/getRecommendations' })
          return reject(new Error('DEFAULT'))
        }

        const tracks = JSON.parse(body)
        return resolve(tracks.tracks)
      })
    })
  } catch (e) {
    return false
  }
}

module.exports = { getRecommendations }
