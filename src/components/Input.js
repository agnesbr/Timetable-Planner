import React, { Component } from 'react'

export default class Input extends Component {
  handleKeyUp = event => {
    const input = event.target
    if (event.key === 'Enter') {
      this.props.onEnter(input.value)
      input.value = ''
      input.focus()
    }
  }

  render() {
    return <input onKeyUp={this.handleKeyUp} placeholder="Add to-do" />
  }
}
