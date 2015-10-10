if (Meteor.isServer) {
  var fs = Npm.require('fs')
}

Router.route('/', function () {
  this.render(null)
})

Router.route('/listen/song/:songId', function () {
  const songId = this.params.songId
  const path = `${process.env.PWD}/public/${songId}.mp3`
  const stat = fs.statSync(path)

  this.response.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  })

  const readStream = fs.createReadStream(path)
  readStream.pipe(this.response)
}, { where: 'server' })
