/* global Songs */
const glob = Meteor.npmRequire('glob')
const path = Meteor.npmRequire('path')

Meteor.startup(() => {
  const pwd = process.env.PWD
  glob(`${pwd}/cache/**/*.mp3`, {}, Meteor.bindEnvironment((err, files) => {
    if (err) throw new Error('glob error in server/fixtures.js')

    const cachedSongs = files.map((file) => {
      return {
        name: path.basename(file),
        path: file.replace(pwd, ''),
        artist: 'Unknown',
        createdAt: +new Date(),
        updatedAt: +new Date()
      }
    })

    const dbSongs = Songs.find().fetch()

    const newSongs = cachedSongs.filter((song) => {
      return dbSongs.filter((dbSong) => song.path === dbSong.path).length === 0
    })

    newSongs.map((song) => Songs.insert(song))
  }))
})
