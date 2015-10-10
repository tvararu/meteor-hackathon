if (Meteor.isServer) {
  var fs = Npm.require('fs')
}

Router.route('/', function () {
  this.render(null)
})

let response = null

Router.route('/listen', function () {
  response = this.response

  response.writeHead(200, {
    'Content-Type': 'audio/mpeg'
  })

  const readStream = fs.createReadStream(process.env.PWD + '/public/07 MisterTenBelow.mp3')
  readStream.pipe(response, { end: false })
}, { where: 'server' })

Router.route('/change', function () {
  console.log('Change')
  const readStream = fs.createReadStream(process.env.PWD + '/public/snippet2.mp3')
  readStream.pipe(response)
  this.response.end()
}, { where: 'server' })

// Router.route('/stop', function () {
//   console.log('Stop', WRITABLE)
//   READABLE.unpipe(WRITABLE)
//   WRITABLE.end()
//   this.response.end()
// }, { where: 'server' })
