import { Component, PropTypes } from 'react'
import { List, ListItem } from 'material-ui'
import classnames from 'classnames'

export default class Playlist extends Component {
  static displayName = 'Playlist'

  static propTypes = {
    playlist: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedSong: PropTypes.object,
    onListItemClick: PropTypes.func
  }

  constructor (props) {
    super(props)
    require('./Playlist.css')
  }

  render () {
    return <div>
      <List>
        { this.props.playlist.map((item, idx) =>
            <div
              className={ classnames('ListItem', {'ListItem--selected': this.props.selectedSong && this.props.selectedSong._id === item._id}) }
              key={ idx }>
              <ListItem
                primaryText={ item.name }
                onClick={ () => this.props.onListItemClick(item) }
              />
            </div>
          )
        }
      </List>
    </div>
  }
}
