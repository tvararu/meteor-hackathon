import { Component } from 'react'
import AudioPlayer from 'components/AudioPlayer'
const LoginButtons = BlazeToReact('loginButtons')

const BASE_URL = '/listen/song'

export default class Test extends Component {
  static displayName = 'Test'

  state = {
    isPlaying: false,
    songId: `${BASE_URL}/42carats`
  }

  changeSong = () => {
    if (this.state.songId === `${BASE_URL}/42carats`) {
      this.setState({ songId: `${BASE_URL}/mistertenbelow` })
    } else {
      this.setState({ songId: `${BASE_URL}/42carats` })
    }
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
    console.log(this.state.isPlaying)
    return <div>
      <LoginButtons />
      <br />
      <button onClick={ this.changeSong }>Change song</button>
      <button onClick={ this.playPause }>Play/pause song</button>
      <br />
      <AudioPlayer
        isPlaying={ this.state.isPlaying }
        onEnd={ this.handlePlayerEnd }
        onProgress={ this.handlePlayerProgress }
        onTimeUpdate={ this.handlePlayerUpdate }
        source={ this.state.songId }
      />
    </div>
  }
}
