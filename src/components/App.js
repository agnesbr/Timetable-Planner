import React, { Component } from 'react'
import styled from 'styled-components'
import Fest from './Fest'
import uid from 'uid'

import festData from '../data/ef_data.json'

export const DisplayContent = styled.section`
  display: flex;
  flex-direction: column;
`

export default class App extends Component {
  render() {
    return <DisplayContent>{this.createFestList()}</DisplayContent>
  }

  createFestList() {
    const festivalsArr = festData.festivals
    return festivalsArr.map(festival => {
      return this.renderSingleFest(festival)
    })
  }

  renderSingleFest(festival) {
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
      />
    )
  }
}
