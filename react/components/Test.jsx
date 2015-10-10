/* global Songs */
Meteor.subscribe('songs')
import { Component, addons } from 'react'
import AudioPlayer from 'components/AudioPlayer'
import Playlist from 'components/Playlist'
import mui from 'material-ui'
import reactMixin from 'react-mixin'

const { LinkedStateMixin } = addons
const ThemeManager = new mui.Styles.ThemeManager()
const LoginButtons = BlazeToReact('loginButtons')

@reactMixin.decorate(LinkedStateMixin)
@reactMixin.decorate(ReactMeteorData)
export default class Test extends Component {
  static displayName = 'Test'

  state = {
    isPlaying: false,
    newSongUrl: '',
    selectedSong: null
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getMeteorData () {
    return {
      songs: Songs.find({}, { sort: { createdAt: -1 } }).fetch()
    }
  }

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  changeSong = (selectedSong) => {
    this.setState({ selectedSong })
  }

  playPause = () => {
    this.setState({ isPlaying: !this.state.isPlaying })
  }

  handlePlayerEnd = () => {

  }

  handlePlayerProgress = () => {

  }

  handlePlayerUpdate = () => {

  }

  addSong = () => {
    const newSongUrl = this.state.newSongUrl
    const isValidUrl = newSongUrl.indexOf('http') === 0
    if (isValidUrl) {
      console.log(isValidUrl)
      Songs.insert({
        name: newSongUrl,
        url: newSongUrl,
        artist: 'Loading...',
        createdAt: +new Date(),
        updatedAt: +new Date()
      })
    }
    this.setState({ newSongUrl: '' })
  }

  render () {
    const audioPlayer = (this.state.selectedSong)
      ? <AudioPlayer
        isPlaying={ this.state.isPlaying }
        onEnd={ this.handlePlayerEnd }
        onProgress={ this.handlePlayerProgress }
        onTimeUpdate={ this.handlePlayerUpdate }
        source={ this.state.selectedSong.path } />
      : null
    return <div>
      <LoginButtons />
      <br />
      <input
        placeholder='Add song to library (YouTube, Soundcloud, etc)'
        type='text'
        valueLink={ this.linkState('newSongUrl') } />
      <button onClick={ this.addSong }>Add song</button>
      <br />
      <button onClick={ this.playPause }>Play/pause song</button>
      <br />
      { audioPlayer }
      <Playlist playlist={ this.data.songs } onListItemClick={ this.changeSong }/>
    </div>
  }
}
