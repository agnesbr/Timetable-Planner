import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import uid from 'uid'

import NavBarBottomIcon from '../NavBarBottomIcon'
import NavBar from '../NavBar'
import Act from '../Act'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faAlignCenter } from '@fortawesome/free-solid-svg-icons'

const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />
const listIcon = (
  <FontAwesomeIcon className="filter-button" icon={faAlignCenter} />
)

export const Wrapper = styled.section`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 120px auto 50px;
  grid-template-columns: 1fr;
  height: 100vh;
`

export const DisplayContent = styled.section`
  display: block;
  overflow-y: scroll;
`

export default class TimetableScreen extends Component {
  // getFestById = festId => {
  //   const { festivals } = this.state

  //   console.log(festivals)
  //   return festivals.find(fest => fest.festId.toString() === festId)
  // }
  render() {
    const { festId } = this.props
    console.log(festId)
    return (
      <Router>
        <Wrapper>
          <NavBar>
            <h1>TIMETABLECSREEN hier muss die headline des fetivals rein </h1>
          </NavBar>

          <DisplayContent data-cy="FestList">
            <p>TIMETABLECSREEN hier muss die headline des fetivals rein </p>
            {/* <Route
              path="/timetable/:festId"
              render={({ match }) => (
                <Act festData={this.getFestById(match.params.festId)} />
              )}
            /> */}
          </DisplayContent>

          <NavBar />
        </Wrapper>
      </Router>
    )
  }
}
