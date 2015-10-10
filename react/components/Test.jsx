import { Component, PropTypes } from 'react'
const LoginButtons = BlazeToReact('loginButtons')

class Player extends Component {
  static displayName = 'Player'

  static propTypes = {
    songId: PropTypes.string.isRequired
  }

  render () {
    console.log(this.props.songId)
    return <audio controls='controls'>
      <source src={ `/listen/song/${this.props.songId}` } type='audio/mpeg' />
    </audio>
  }
}

export default class Test extends Component {
  static displayName = 'Test'

  state = {
    songId: '42carats'
  }

  changeSong = () => {
    console.log('changeSong')
    this.setState({ songId: 'mistertenbelow' })
  }

  render () {
    return <div>
      <LoginButtons />
      <br />
      <button onClick={ this.changeSong }>Change song</button>
      <Player songId={ this.state.songId } />
    </div>
  }
}
