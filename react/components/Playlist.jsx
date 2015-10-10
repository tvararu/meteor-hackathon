import { Component, PropTypes } from 'react'
import { List, ListItem } from 'material-ui'

export default class Playlist extends Component {
  static propTypes = {
    playlist: PropTypes.arrayOf(PropTypes.object).isRequired,
    onListItemClick: PropTypes.func
  }

  render () {
    return <div>
      <List>
        { this.props.playlist.map((item, idx) =>
          <ListItem
            primaryText={ item.name }
            secondaryText={ item.artist }
            key={ idx }
            onClick={ () => this.props.onListItemClick(item) }
          />)
        }
      </List>
    </div>
  }
}
