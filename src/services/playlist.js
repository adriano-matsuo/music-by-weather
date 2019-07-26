const playlist = require('../lib/playlist')

/**
 * @module services/playlist
 * @method [services/playlist] get
 * @description Returns a playlist by city
 * @param  {KoaContext} ctx
 */
const get = async ctx => {
  const city = ctx.params.city

  ctx.body = await playlist.get(city)
}

module.exports = { get }
