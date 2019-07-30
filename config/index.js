const config = {
  openWeatherApi: {
    key: process.env.OPENWEATHER_API_KEY
  },
  spotifyApi: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  }
}

module.exports = config
