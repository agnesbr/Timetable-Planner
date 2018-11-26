import React, { Component } from 'react'

export default class FestivalPage extends Component {
  render() {
    const { data } = this.props
    return <div>{data.festName}</div>
  }
}
