import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'

import FestCard from './FestCard'
import festData from '../data/ef_data.json'

export const DisplayContent = styled.section`
  display: flex;
  flex-direction: column;
`

export default class App extends Component {
  render() {
    const { festivalsArr } = festData
    console.log(festivalsArr)
    // .map(entry => ({
    const festId = festData.festivals[0].festId
    const festName = festData.festivals[0].festName
    const festStartDate = festData.festivals[0].festStartDate
    const festEndDate = festData.festivals[0].festEndDate
    const festCountry = festData.festivals[0].festCountry
    const festCity = festData.festivals[0].festCity

    return (
      <DisplayContent>
        <FestCard
          festId={festId}
          festName={festName}
          festStartDate={festStartDate}
          festEndDate={festEndDate}
          festCountry={festCountry}
          festCity={festCity}
        />
      </DisplayContent>
    )
  }
}
