// Built by @gaearon, made available at https://gist.github.com/gaearon/830490fc17d3fccc88c9.

var React = require('react')
var { PropTypes } = React
const BASE_URL = '/listen/song'

export default React.createClass({
  propTypes: {
    source: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    defaultTime: PropTypes.number,
    onProgress: React.PropTypes.func.isRequired,
    onTimeUpdate: React.PropTypes.func.isRequired,
    onEnd: React.PropTypes.func.isRequired
  },

  componentDidMount () {
    var node = this.getDOMNode()

    node.addEventListener('progress', this.handleProgress)
    node.addEventListener('timeupdate', this.handleTimeUpdate)
    node.addEventListener('ended', this.handleMediaEnd)

    this.updateIsPlaying()
  },

  componentDidUpdate (prevProps) {
    if (prevProps.source !== this.props.source) {
      this.updateSource()
    }

    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.updateIsPlaying()
    }

    if (prevProps.defaultTime !== this.props.defaultTime) {
      this.updateCurrentTime()
    }
  },

  componentWillUnmount () {
    var node = this.getDOMNode()

    node.removeEventListener('progress', this.handleProgress)
    node.removeEventListener('timeupdate', this.handleTimeUpdate)
    node.removeEventListener('ended', this.handleMediaEnd)
  },

  render () {
    return <audio>
      <source src={ `${BASE_URL}/${this.props.source}` } type='audio/mpeg' />
    </audio>
  },

  handleTimeUpdate () {
    var node = this.getDOMNode()
    var currentTime = node.currentTime
    var trackDuration = node.duration

    this.props.onTimeUpdate({
      currentTime: currentTime,
      trackDuration: trackDuration
    })
  },

  handleMediaEnd () {
    this.getDOMNode().currentTime = 0
    this.props.onEnd()
  },

  handleProgress () {
    var node = this.getDOMNode()
    var trackDuration = node.duration
    var buffered = node.buffered

    this.props.onProgress({
      trackDuration: trackDuration,
      buffered: buffered
    })
  },

  updateCurrentTime () {
    var node = this.getDOMNode()
    if (node.readyState) {
      node.currentTime = this.props.defaultTime
    }
  },

  updateIsPlaying () {
    var node = this.getDOMNode()
    var isPlaying = this.props.isPlaying

    if (isPlaying) {
      node.play()
    } else {
      node.pause()
    }
  },

  updateSource () {
    var node = this.getDOMNode()
    var isPlaying = this.props.isPlaying

    node.pause()
    this.props.onTimeUpdate({
      currentTime: 0,
      trackDuration: node.duration
    })

    node.load()
    if (isPlaying) {
      node.play()
    }
  }
})
