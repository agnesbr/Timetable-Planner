import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import uid from 'uid'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import NavBar from '../NavBar'
import Act from '../Act'
import NavBarBottomIcon from '../NavBarBottomIcon'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const backIcon = (
  <FontAwesomeIcon className="filter-button" icon={faAngleLeft} />
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

export const Homelink = styled(Link)`
  display: block;
`

export default class TimetableScreen extends Component {
  state = {
    iconIsDefault: true
  }

  createActList(festObject) {
    return festObject.timeTable.map(this.renderSingleAct)
  }

  renderSingleAct = act => {
    const { actEndDate, actName, actStartDate, actsId, areaName } = act
    return (
      <Act
        key={uid()}
        actEndDate={actEndDate}
        actName={actName}
        actStartDate={actStartDate}
        actsId={actsId}
        areaName={areaName}
      />
    )
  }

  getFestById = (festivals, festId) => {
    return festivals.find(festival => festival.festId.toString() === festId)
  }

  render() {
    const { festivals, festId } = this.props
    const festObject = this.getFestById(festivals, festId)
    return (
      <Wrapper>
        <NavBar>
          <h1> {festObject.festName}</h1>
        </NavBar>
        <DisplayContent data-cy="ActsList">
          {this.createActList(festObject)}
        </DisplayContent>
        <NavBar>
          <NavLink to="/">
            <NavBarBottomIcon
              fontSize={30}
              defaultIcon={backIcon}
              activeIcon={backIcon}
              // onClick={() => this.handleToggleButtonBookmarked()}
              iconIsDefault={this.state.iconIsDefault}
            />
          </NavLink>
        </NavBar>
      </Wrapper>
    )
  }
}
