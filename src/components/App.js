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
    return festivalsArr.map((festival, index) => {
      return this.renderSingleFest(festival, index)
    })
  }

  renderSingleFest(festival, index) {
    return (
      <Fest
        key={uid()}
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
