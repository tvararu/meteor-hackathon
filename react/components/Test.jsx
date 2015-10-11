/* global Songs */
Meteor.subscribe('songs')
import { Component, addons } from 'react'
import AudioPlayer from 'components/AudioPlayer'
import Playlist from 'components/Playlist'
import mui from 'material-ui'
import reactMixin from 'react-mixin'
import Player from 'components/Player'

const { TextField, RaisedButton } = mui

const { LinkedStateMixin } = addons
const ThemeManager = new mui.Styles.ThemeManager()
// const LoginButtons = BlazeToReact('loginButtons')

@reactMixin.decorate(LinkedStateMixin)
@reactMixin.decorate(ReactMeteorData)
export default class Test extends Component {
  static displayName = 'Test'

  static propTypes = {
    params: React.PropTypes.object
  }

  state = {
    isPlaying: false,
    newSongUrl: '',
    selectedSong: null
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  constructor (props) {
    super(props)
    require('normalize.css')
    require('./Test.css')
  }

  getMeteorData () {
    return {
      songs: Songs.find({}, { sort: { createdAt: -1 } }).fetch(),
      selectedSong: Songs.find(this.props.params.id).fetch()
    }
  }

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  changeSong = (selectedSong) => {
    this.setState({
      isPlaying: true,
      selectedSong
    })
  }

  playPause = () => {
    this.setState({ isPlaying: !this.state.isPlaying })
  }

  handlePlayerEnd = () => { }

  handlePlayerProgress = () => { }

  handlePlayerUpdate = () => { }

  playNext = () => {
    const songs = this.data.songs
    const idx = songs.findIndex(song => song._id === this.state.selectedSong._id)

    if (idx + 1 === songs.length) {
      this.changeSong(songs[0])
    } else {
      this.changeSong(songs[idx + 1])
    }
  }

  playPrevious = () => {
    const songs = this.data.songs
    const idx = songs.findIndex(song => song._id === this.state.selectedSong._id)

    if (idx - 1 === -1) {
      this.changeSong(songs[songs.length - 1])
    } else {
      this.changeSong(songs[idx - 1])
    }
  }

  addSong = () => {
    const newSongUrl = this.state.newSongUrl
    const isValidUrl = newSongUrl.indexOf('http') === 0
    if (isValidUrl) {
      console.log(isValidUrl)
      Songs.insert({
        name: newSongUrl,
        artist: 'Loading...',
        url: newSongUrl,
        createdAt: +new Date(),
        updatedAt: +new Date()
      })
    }
    this.setState({ newSongUrl: '' })
  }

  render () {
    const selectedSong = this.state.selectedSong || this.data.selectedSong[0]
    const isPlaying = (this.state.selectedSong)
      ? this.state.isPlaying
      : !!selectedSong
    const audioPlayer = (selectedSong && selectedSong.path)
      ? <AudioPlayer
        isPlaying={ isPlaying }
        onEnd={ this.handlePlayerEnd }
        onProgress={ this.handlePlayerProgress }
        onTimeUpdate={ this.handlePlayerUpdate }
        source={ selectedSong.path } />
      : null
    const player = (selectedSong && selectedSong.path)
      ? <Player
        isPlaying={ isPlaying }
        item={ selectedSong }
        onClickPlay={ this.playPause }
        onClickNext={ this.playNext }
        onClickPrevious={ this.playPrevious }
      /> : null
    return <div className='App'>
      <div className='Import'>
        <TextField
          hintText='YouTube, Soundcloud, etc'
          floatingLabelText='Add song to library'
          valueLink={ this.linkState('newSongUrl') } />
        <RaisedButton onClick={ this.addSong } label='Add song' />
      </div>
      <Playlist
        playlist={ this.data.songs }
        selectedSong={ selectedSong }
        onListItemClick={ this.changeSong } />
      { player }
      { audioPlayer }
    </div>
  }
}
