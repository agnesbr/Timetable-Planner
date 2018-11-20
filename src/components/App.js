import React, { Component } from 'react'
import styled from 'styled-components'
import Fest from './Fest'

import festData from '../data/ef_data.json'

export const DisplayContent = styled.section`
  display: flex;
  flex-direction: column;
`

export default class App extends Component {
  state = {
    festivals: festData
  }

  toggleBookmark = id => {
    console.log(id)
    const { festivals } = this.state
    const index = festivals.findIndex(f => f.festId === id)
    const festival = festivals[index]
    this.setState({
      festivals: [
        ...festivals.slice(0, index),
        {
          ...festival,
          isBookmarked:
            festival.isBookmarked == null ? true : !festival.isBookmarked
        },
        ...festivals.slice(index + 1)
      ]
    })
  }

  render() {
    return <DisplayContent>{this.createFestList()}</DisplayContent>
  }

  createFestList() {
    return this.state.festivals.map(this.renderSingleFest)
  }

  renderSingleFest = festival => {
    const {
      festId,
      festName,
      festStartDate,
      festEndDate,
      festCountry,
      festCity,
      isBookmarked
    } = festival

    return (
      <Fest
        key={festId}
        festId={festId}
        festName={festName}
        festStartDate={festStartDate}
        festEndDate={festEndDate}
        festCountry={festCountry}
        festCity={festCity}
        isBookmarked={isBookmarked}
        toggleBookmark={() => this.toggleBookmark(festId)}
      />
    )
  }
}
