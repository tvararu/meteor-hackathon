import { Component, PropTypes } from 'react'

export default class Player extends Component {
  static displayName = 'Player'

  static propTypes = {
    item: PropTypes.object,
    onClickPlay: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired
  }

  render () {
    return <div className='Player'>
      <div className='Player__Info'>
        <h2 className='Player__Name'>{ this.props.item.name }</h2>
        <h3 className='Player__Artist'>{ this.props.item.artist }</h3>
      </div>
      <div className='Player__Controls'>
        <i
          className='fa fa-backward fa-2x'
          onClick={ this.props.onClickPrevious }
        />
        <i
          className='fa fa-play fa-2x'
          onClick={ this.props.onClickPlay }
        />
        <i
          className='fa fa-forward fa-2x'
          onClick={ this.props.onClickNext }
        />

      </div>
    </div>
  }
}
