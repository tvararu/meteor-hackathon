import { Component } from 'react'
const LoginButtons = BlazeToReact('loginButtons')

export default class Test extends Component {
  static displayName = 'Test'

  constructor (props) {
    super(props)
    require('./Test.css')
  }

  render () {
    // const userId = Meteor.user()._id
    const songId = '42carats'
    return (
      <div>
        <LoginButtons />
        <br />
        <audio controls='controls'>
          <source src={ `/listen/song/${songId}` } type='audio/mpeg' />
        </audio>
      </div>
    )
  }
}
