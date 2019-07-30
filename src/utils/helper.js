/**
 * @module util/helper
 * @method [util/helper] parsePlaylist
 * @description Parses Spotify recommendations
 * @param  {object} recommendations Spotify recommendations
 * @returns {object} Object containing a shuffled array of tracks limited to 10
 */
const parseTracks = (recommendations) => {
  let playlist = []
  
  recommendations.map((data) => {
    const artists = []
    data.artists.map((artist) => {
      artists.push(artist.name)
    })

    const track = {
      album: data.album.name, 
      artist: artists.join(', '),
      name: data.name
    }

    playlist.push(track)
  })

  return playlist.sort( () => Math.random() - 0.5).splice(0, 10)

}

/**
 * @module util/helper
 * @method [util/helper] getGenre
 * @description Returns a music genre based on temperature range
 * @param  {Number} temperature
 * @returns {String} Music genre
 */
const getGenre = (temperature) => {
  if (temperature >= 25) {
    return 'pop'
  }

  if (temperature < 10) {
    return 'classical'
  }

  return 'rock'
}

module.exports = { parseTracks, getGenre }
