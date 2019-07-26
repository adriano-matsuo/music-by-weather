const Router = require('koa-router')
const services = require('./services')

const { health, playlist } = services

const createRouter = () => {
  const router = new Router()

  router.get('/health', health.get)
  router.get('/playlist/:city', playlist.get)

  return router
}

module.exports = createRouter().routes()
