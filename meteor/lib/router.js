Router.route('/', function () {
  this.render(null)
})

let WRITABLE = null
let READABLE = null

Router.route('/listen', function () {
  const fs = Npm.require('fs')
  const fullFilePath = '/Users/tvararu/Music/Bones - Banshee/07 MisterTenBelow.mp3'

  this.response.writeHead(200, {
    'Content-Type': 'audio/mpeg'
  })

  WRITABLE = this.response
  const readStream = fs.createReadStream(fullFilePath)
  READABLE = readStream
  READABLE.pipe(WRITABLE)
}, { where: 'server' })

Router.route('/change', function () {
  console.log('Change')
  const fs = Npm.require('fs')
  const fullFilePath = '/Users/tvararu/Music/Bones - Banshee/08 42Carats.mp3'
  const readStream = fs.createReadStream(fullFilePath)
  READABLE.unpipe(WRITABLE)
  WRITABLE.end()
  this.response.end()
}, { where: 'server' })

Router.route('/stop', function () {
  console.log('Stop', WRITABLE)
  READABLE.unpipe(WRITABLE)
  WRITABLE.end()
  this.response.end()
}, { where: 'server' })
