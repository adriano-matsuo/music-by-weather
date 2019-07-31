const config = {
  openWeatherApi: {
    key: process.env.OPENWEATHER_API_KEY
  },
  spotifyApi: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    openWeather: {
      timeout: 1800
    },
    spotify: {
      timeout: 1200
    }
  }
}

module.exports = config
