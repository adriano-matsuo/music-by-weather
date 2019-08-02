const config = {
  openWeatherApi: {
    key: process.env.OPENWEATHER_API_KEY
  },
  spotifyApi: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  },
  redis: {
    url: process.env.REDIS_URL,
    openWeather: {
      timeout: 1800
    },
    spotify: {
      timeout: 1200
    }
  }
}

module.exports = config
