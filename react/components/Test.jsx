import { Component } from 'react'
import AudioPlayer from 'components/AudioPlayer'
import Playlist from 'components/Playlist'
import mui from 'material-ui'
const ThemeManager = new mui.Styles.ThemeManager()

const LoginButtons = BlazeToReact('loginButtons')
const collection = [
  {
    name: '42carats',
    artist: 'Artist'
  },
  {
    name: 'mistertenbelow',
    artist: 'Artist'
  },
  {
    name: 'snippet1',
    artist: 'Artist'
  },
  {
    name: 'snippet2',
    artist: 'Artist'
  }]
const BASE_URL = '/listen/song'

export default class Test extends Component {
  static displayName = 'Test'

  state = {
    isPlaying: false,
    songId: `${BASE_URL}/42carats`
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  changeSong = (name) => {
    this.setState({ songId: `${BASE_URL}/${name}` })
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
    console.log(this.state.songId)
    return <div>
      <LoginButtons />
      <br />
      <button onClick={ this.playPause }>Play/pause song</button>
      <br />
      <AudioPlayer
        isPlaying={ this.state.isPlaying }
        onEnd={ this.handlePlayerEnd }
        onProgress={ this.handlePlayerProgress }
        onTimeUpdate={ this.handlePlayerUpdate }
        source={ this.state.songId }
      />
    <Playlist playlist={ collection } onListItemClick={ this.changeSong }/>
    </div>
  }
}
