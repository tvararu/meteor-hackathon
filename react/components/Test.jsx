import { Component } from 'react'

export default class Test extends Component {
  static displayName = 'Test'

  constructor (props) {
    super(props)
    require('./Test.css')
  }

  render () {
    const LoginButtons = BlazeToReact('loginButtons')
    return (
      <div>
        <LoginButtons />
      </div>
    )
  }
}
