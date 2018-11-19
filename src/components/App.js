import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'

import FestCard from './FestCard'

export const DisplayContent = styled.section`
  display: flex;
  flex-direction: column;
`

export default class App extends Component {
  render() {
    const festId = '23345'
    const festName = 'COACHELLA VALLEY MUSIC AND ARTS FESTIVAL'
    const festStartDate = '1995/12/17'
    const festEndDate = '1995/12/17'
    const festCountry = 'Musterland'
    const festCity = 'Musterstadt'

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
        <FestCard
          festId={festId}
          festName={festName}
          festStartDate={festStartDate}
          festEndDate={festEndDate}
          festCountry={festCountry}
          festCity={festCity}
        />
        <FestCard
          festId={festId}
          festName={festName}
          festStartDate={festStartDate}
          festEndDate={festEndDate}
          festCountry={festCountry}
          festCity={festCity}
        />
        <FestCard
          festId={festId}
          festName={festName}
          festStartDate={festStartDate}
          festEndDate={festEndDate}
          festCountry={festCountry}
          festCity={festCity}
        />
        <FestCard
          festId={festId}
          festName={festName}
          festStartDate={festStartDate}
          festEndDate={festEndDate}
          festCountry={festCountry}
          festCity={festCity}
        />{' '}
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
