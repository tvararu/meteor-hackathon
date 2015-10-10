import { Component, PropTypes } from 'react'
import { List, ListItem } from 'material-ui'

export default class Playlist extends Component {
  static propTypes = {
    playlist: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  render () {
    return <div>
      <List>
        { this.props.playlist.map((item, idx) => <ListItem primaryText={ item } key={ idx } />) }
      </List>
    </div>
  }
}
