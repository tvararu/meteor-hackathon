if (Meteor.isServer) {
  var fs = Npm.require('fs')
}

Router.route('/', function () {
  this.render(null)
})

Router.route('/listen/song/:songPath', function () {
  const songPath = this.params.songPath
  const path = `${process.env.PWD}/cache/${songPath}`
  const stat = fs.statSync(path)

  this.response.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  })

  const readStream = fs.createReadStream(path)
  readStream.pipe(this.response)
}, { where: 'server' })
