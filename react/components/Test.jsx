/* global Songs */
Meteor.subscribe('songs')
import { Component } from 'react'
import AudioPlayer from 'components/AudioPlayer'
import Playlist from 'components/Playlist'
import mui from 'material-ui'
const ThemeManager = new mui.Styles.ThemeManager()
import reactMixin from 'react-mixin'

const LoginButtons = BlazeToReact('loginButtons')

@reactMixin.decorate(ReactMeteorData)
export default class Test extends Component {
  static displayName = 'Test'

  state = {
    isPlaying: false,
    selectedSong: null
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getMeteorData () {
    return {
      songs: Songs.find().fetch()
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

  render () {
    const audioPlayer = (this.state.selectedSong)
      ? <AudioPlayer
        isPlaying={ this.state.isPlaying }
        onEnd={ this.handlePlayerEnd }
        onProgress={ this.handlePlayerProgress }
        onTimeUpdate={ this.handlePlayerUpdate }
        source={ this.state.selectedSong.path }
      /> : null
    return <div>
      <LoginButtons />
      <br />
      <button onClick={ this.playPause }>Play/pause song</button>
      <br />
      { audioPlayer }
      <Playlist playlist={ this.data.songs } onListItemClick={ this.changeSong }/>
    </div>
  }
}
