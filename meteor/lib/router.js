if (Meteor.isServer) {
  var fs = Npm.require('fs')
}

Router.route('/listen/song/:songPath', function () {
  const songPath = decodeURIComponent(this.params.songPath)
  const path = `${process.env.PWD}/cache/${songPath}`
  console.log('Streaming', path)
  try {
    var stat = fs.statSync(path)
  } catch (e) {
    console.log('ERROR: File does not exist: ', path)
    this.response.end()
    return
  }
  console.log('Size', stat.size)

  this.response.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  })

  const readStream = fs.createReadStream(path)
  readStream.pipe(this.response)
}, { where: 'server' })

Router.route('/(.*)', function () {
  this.render(null)
})
