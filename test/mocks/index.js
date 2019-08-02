const mocks = {
  spotify: {
    getRecommendations: require('./api/spotify/getRecommendations-response')
  },
  openWeather: {
    getWeather: require('./api/openWeather/getWeather-response'),
    getWeatherWithTempUnder10: require('./api/openWeather/getWeatherWithTempUnder10-response'),
    getWeatherWithTempAbove25: require('./api/openWeather/getWeatherWithTempAbove25-response')
  }
}

module.exports = mocks
