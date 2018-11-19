import React, { Component } from 'react'
import styled from 'styled-components'

import FestCard from './FestCard'
import festData from '../data/ef_data.json'

export const DisplayContent = styled.section`
  display: flex;
  flex-direction: column;
`

export default class App extends Component {
  render() {
    return <DisplayContent>{this.createFestivalListItems()}</DisplayContent>
  }

  createFestivalListItems() {
    const festivalsArr = festData.festivals
    return festivalsArr.map((festival, index) => {
      return this.renderSingleFestCard(festival, index)
    })
  }

  renderSingleFestCard(festival, index) {
    return (
      <FestCard
        key={festival.festId + index}
        festId={festival.festId}
        festName={festival.festName}
        festStartDate={festival.festStartDate}
        festEndDate={festival.festEndDate}
        festCountry={festival.festCountry}
        festCity={festival.festCity}
      />
    )
  }
}
