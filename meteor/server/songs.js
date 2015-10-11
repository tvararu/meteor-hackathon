/* global Songs */
// const fs = Meteor.npmRequire('fs')
// const path = Meteor.npmRequire('path')
const youtubedl = Meteor.npmRequire('youtube-dl')

const downloadSong = (url, cb) => {
  const pwd = process.env.PWD
  // const path = `${pwd}/cache/${filename}`

  // let fileAlreadyExists = true
  //
  // try {
  //   fs.statSync(path)
  // } catch (e) {
  //   fileAlreadyExists = false
  // }
  //
  // if (fileAlreadyExists) {
  //   return cb(path, 'Unknown')
  // }

  youtubedl.exec(url, ['-x', '--audio-format=mp3', '-o %(title)s.%(ext)s'], { cwd: `${pwd}/cache/` }, (err, output) => {
    if (err) throw err
    // console.log(output.join('\n'))
    let line = ''
    line = output.filter(line => line.indexOf('Destination: ') !== -1)[0]
    if (line) {
      line = line.replace('[download] Destination: ', '')
    } else {
      line = output.filter(line => line.indexOf('has already been downloaded') !== -1)[0]
      line = line.replace('[download] ', '').replace(' has already been downloaded', '')
    }
    console.log(line)
    const filename = line.replace('.m4a', '.mp3')
    const title = line.replace('.m4a', '').trim()
    cb(filename, title)
  })
  // var title = ''
  //
  // song.on('info', (info) => {
  //   console.log('Download started')
  //   console.log('title: ', info.title)
  //   console.log('size: ', info.size)
  //   title = info.title
  // })
  //
  // song.pipe(fs.createWriteStream(path))
  // song.on('end', () => {
  //   console.log('Finished: ', title)
  //   cb(filename, title)
  // })
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
