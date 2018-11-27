import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Fest from '../Fest'
import NavBarBottomIcon from '../NavBarBottomIcon'
import NavBar from '../NavBar'
import InputSearch from '../InputSearch'
import FestivalPage from '../FestivalPage'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faAlignCenter } from '@fortawesome/free-solid-svg-icons'

import uid from 'uid'

import festData from '../../data/ef_data.json'

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
  state = {
    festivals: festData
  }

  getFestById = festId => {
    const { festivals } = this.state
    return festivals.find(fest => fest.festId.toString() === festId)
  }

  render() {
    // const { festData } = this.props
    // return <Wrapper>{festData.festName}</Wrapper>
    return (
      <Router>
        <Wrapper>
          <NavBar>
            <h1>TIMETABLECSREEN hier muss die headline des fetivals rein </h1>
            <InputSearch onChange={this.updateSearch} />
          </NavBar>

          <DisplayContent data-cy="FestList">
            <Route
              path="/timetable/:festId"
              render={({ match }) => (
                <FestivalPage
                  festData={this.getFestById(match.params.festId)}
                />
              )}
            />
          </DisplayContent>

          <NavBar>
            <NavBarBottomIcon
              defaultIcon={starIcon}
              activeIcon={listIcon}
              onClick={() => this.handleToggleButtonBookmarked()}
              iconIsDefault={this.state.iconIsDefault}
            />
          </NavBar>
        </Wrapper>
      </Router>
    )
  }
}

// {this.getFestName(match.params.festName)}
