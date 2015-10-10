Router.route('/', function () {
  this.render(null)
})

Router.route('/listen', function () {
  const fs = Npm.require('fs')
  const fullFilePath = '/Users/tvararu/github/node-mp3-test/song.mp3'
  const stat = fs.statSync(fullFilePath)

  this.response.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  })

  const readStream = fs.createReadStream(fullFilePath)
  readStream.pipe(this.response)
}, { where: 'server' })
