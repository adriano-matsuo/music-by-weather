const createServer = require('helpers/create-server')
const redisHelper = require('helpers/redis')
const openWeatherApi = require('../server/api/openWeather')
const spotifyApi = require('../server/api/spotify')
const sinon = require('sinon')
const { assert } = require('chai')
const mocks = require('./mocks')

describe('GET /playlist/:city', function () {
  let request, sandbox

  before(async () => {
    redisClient = redisHelper.client
    redisHelper.stub()
  })

  after(() => {
    redisHelper.restore()
  })

  beforeEach(async function () {
    request = await createServer()
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should return 200', async () => {
    sandbox.stub(openWeatherApi, 'getWeather').returns(mocks.openWeather.getWeather)
    sandbox.stub(spotifyApi, 'getRecommendations').returns(mocks.spotify.getRecommendations)

    await request.get('/playlist/campinas')
      .expect(200)
  })

  it('should return 404 - city not found', async () => {
    sandbox.stub(openWeatherApi, 'getWeather').returns(null)

    await request.get('/playlist/somecity')
      .expect(404)
  })

  it('should return a playlist with classical genre', async () => {
    sandbox.stub(openWeatherApi, 'getWeather').returns(mocks.openWeather.getWeatherWithTempUnder10)
    sandbox.stub(spotifyApi, 'getRecommendations').returns(mocks.spotify.getRecommendations)

    await request.get('/playlist/sao paulo')
      .expect(200)
      .then((res) => {
        assert.equal(res.body.genre, 'classical')
      })
  })

  it('should return a playlist with rock genre', async () => {
    sandbox.stub(openWeatherApi, 'getWeather').returns(mocks.openWeather.getWeather)
    sandbox.stub(spotifyApi, 'getRecommendations').returns(mocks.spotify.getRecommendations)

    await request.get('/playlist/campinas')
      .expect(200)
      .then((res) => {
        assert.equal(res.body.genre, 'rock')
      })
  })

  it('should return a playlist with pop genre', async () => {
    sandbox.stub(openWeatherApi, 'getWeather').returns(mocks.openWeather.getWeatherWithTempAbove25)
    sandbox.stub(spotifyApi, 'getRecommendations').returns(mocks.spotify.getRecommendations)

    await request.get('/playlist/natal')
      .expect(200)
      .then((res) => {
        assert.equal(res.body.genre, 'pop')
      })
  })
})
