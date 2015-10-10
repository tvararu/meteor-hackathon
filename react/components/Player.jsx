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
    return <div className='Player'>
      <div className='Player__Info'>
        <h2 className='Player__Name'>{ this.props.item.name }</h2>
      </div>
      <div className='Player__Controls'>
        <IconButton
          iconClassName='material-icons'
          tooltipPosition='top-center'
          tooltip='Previous'
          onClick={ this.props.onClickPrevious }>
          skip_previous
        </IconButton>
        <IconButton
          iconClassName='material-icons'
          tooltipPosition='top-center'
          tooltip='Next'
          onClick={ this.props.onClickPlay }>
          { (this.props.isPlaying) ? 'pause_circle_outline' : 'play_circle_outline' }
        </IconButton>
        <IconButton
          iconClassName='material-icons'
          tooltipPosition='top-center'
          tooltip='Next'
          onClick={ this.props.onClickNext }>
          skip_next
        </IconButton>

      </div>
    </div>
  }
}
