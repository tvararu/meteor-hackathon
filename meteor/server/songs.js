/* global Songs */
const fs = Meteor.npmRequire('fs')
const youtubedl = Meteor.npmRequire('youtube-dl')

const downloadSong = (url, cb) => {
  const pwd = process.env.PWD
  const filename = `${encodeURIComponent(url)}.mp3`
  const path = `${pwd}/cache/${filename}`

  let fileAlreadyExists = true

  try {
    fs.statSync(path)
  } catch (e) {
    fileAlreadyExists = false
  }

  if (fileAlreadyExists) {
    return cb(path, 'Unknown')
  }

  const song = youtubedl(url, ['--extract-audio', '--audio-format=mp3', '--audio-quality=0'])
  var title = ''

  song.on('info', (info) => {
    console.log('Download started')
    console.log('title: ', info.title)
    console.log('size: ', info.size)
    title = info.title
  })

  song.pipe(fs.createWriteStream(path))
  song.on('end', () => {
    console.log('Finished: ', title)
    cb(filename, title)
  })
}

Meteor.publish('songs', () => {
  return Songs.find()
})

Songs.allow({
  insert: () => true,
  remove: () => true
})

Songs.find().observe({
  added (newSong) {
    if (!newSong.path && newSong.url) {
      console.log('newSong:', newSong)
      console.log('newSong missing path')
      downloadSong(newSong.url, Meteor.bindEnvironment((filename, title) => {
        console.log('filename', filename)
        console.log('title', title)
        Songs.update(newSong._id, {
          name: title,
          artist: 'Unknown',
          path: filename,
          createdAt: newSong.createdAt,
          updatedAt: +new Date()
        })
      }))
    }
  }
})
