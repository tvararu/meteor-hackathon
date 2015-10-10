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
    return (
      <div>
        <LoginButtons />
        <br />
        <audio controls='controls'>
          <source src={ `/listen` } type='audio/mpeg' />
        </audio>
      </div>
    )
  }
}
