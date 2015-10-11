import { Component, PropTypes } from 'react'
import { IconButton } from 'material-ui'

export default class Player extends Component {
  static displayName = 'Player'

  static propTypes = {
    isPlaying: PropTypes.bool,
    item: PropTypes.object,
    onClickPlay: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    onClickPrevious: PropTypes.func.isRequired
  }

  render () {
    const iconStyle = {
      fontSize: '44px',
      width: '60px',
      height: '60px'
    }
    const iconStyleBig = {
      fontSize: '44px',
      width: '60px',
      height: '60px'
    }
    return <div className='Player'>
      <div className='Player__Info'>
        <h2 className='Player__Name'>{ this.props.item.name }</h2>
      </div>
      <div className='Player__Controls'>
        <IconButton
          className='Prev'
          iconClassName='material-icons'
          tooltipPosition='top-center'
          tooltip='Previous'
          onClick={ this.props.onClickPrevious }
          iconStyle={ iconStyle }
        >
          skip_previous
        </IconButton>
        <IconButton
          className='Play'
          iconClassName='material-icons'
          tooltipPosition='top-center'
          tooltip='Play/Pause'
          onClick={ this.props.onClickPlay }
          iconStyle={ iconStyleBig }
        >
          { (this.props.isPlaying) ? 'pause_circle_outline' : 'play_circle_outline' }
        </IconButton>
        <IconButton
          className='Next'
          iconClassName='material-icons'
          tooltipPosition='top-center'
          tooltip='Next'
          onClick={ this.props.onClickNext }
          iconStyle={ iconStyle }
        >
          skip_next
        </IconButton>

      </div>
    </div>
  }
}
