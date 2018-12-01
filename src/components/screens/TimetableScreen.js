import React, { Component } from 'react'
import styled from 'styled-components'
import uid from 'uid'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faAlignCenter,
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons'

import NavBar from '../NavBar'
import Act from '../Act'
import NavBarBottomIcon from '../NavBarBottomIcon'
import NavBarBottom from '../NavBarBottom'

const backIcon = (
  <FontAwesomeIcon className="filter-button" icon={faAngleLeft} />
)
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

export const Homelink = styled(Link)`
  display: block;
`

export default class TimetableScreen extends Component {
  state = {
    iconIsDefault: true,
    isActBookmarked: this.loadFavoriteActs()
  }

  toggleBookmark = actsId => {
    const { isActBookmarked } = this.state

    const newIsActBookmarked = isActBookmarked.includes(actsId)
      ? this.deleteItemFromActIsBookmarked(actsId)
      : this.addItemToIsActBookmarked(actsId)

    this.setState({
      isActBookmarked: newIsActBookmarked
    })
  }

  deleteItemFromActIsBookmarked = actsId => {
    const { isActBookmarked } = this.state
    const bookmarkedIndex = isActBookmarked.indexOf(actsId)
    const newIsActBookmarked = [
      ...isActBookmarked.slice(0, bookmarkedIndex),
      ...isActBookmarked.slice(bookmarkedIndex + 1)
    ]

    return newIsActBookmarked
  }

  addItemToIsActBookmarked = actsId => {
    const { isActBookmarked } = this.state
    const newIsActBookmarked = isActBookmarked.includes(actsId)
      ? [...isActBookmarked]
      : [...isActBookmarked, actsId]

    return newIsActBookmarked
  }

  isActBookmarked(actsId) {
    const { isActBookmarked } = this.state
    return isActBookmarked.includes(actsId)
  }

  getSelectedActList = timeTable => {
    const { iconIsDefault } = this.state
    return timeTable.filter(
      act => iconIsDefault || this.isActBookmarked(act.actsId)
    )
  }

  createActList(festObject) {
    return this.getSelectedActList(festObject.timeTable).map(
      this.renderSingleAct
    )
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
        isBookmarked={this.isActBookmarked(actsId)}
        toggleBookmark={this.toggleBookmark}
      />
    )
  }

  getFestById = (festivals, festId) => {
    return festivals.find(festival => festival.festId.toString() === festId)
  }

  render() {
    this.saveFavoriteActs()
    const { festivals, festId } = this.props
    const festObject = this.getFestById(festivals, festId)
    console.log(festObject)
    console.log(festObject.timeTable)

    return (
      <Wrapper>
        <NavBar>
          <h1> {festObject.festName}</h1>
        </NavBar>
        <DisplayContent data-cy="ActsList">
          {this.createActList(festObject)}
        </DisplayContent>
        <NavBarBottom>
          <NavLink to="/">
            <NavBarBottomIcon
              fontSize={30}
              defaultIcon={backIcon}
              activeIcon={backIcon}
              iconIsDefault={this.state.iconIsDefault}
            />
          </NavLink>
          <NavBarBottomIcon
            fontSize={20}
            defaultIcon={starIcon}
            activeIcon={listIcon}
            onClick={() => this.handleToggleButtonBookmarked()}
            iconIsDefault={this.state.iconIsDefault}
          />
        </NavBarBottom>
      </Wrapper>
    )
  }
  handleToggleButtonBookmarked = () => {
    this.setState({
      iconIsDefault: !this.state.iconIsDefault
    })
  }

  saveFavoriteActs() {
    localStorage.setItem(
      'TimeTable--isActBookmarked',
      JSON.stringify(this.state.isActBookmarked)
    )
  }

  loadFavoriteActs() {
    try {
      return (
        JSON.parse(localStorage.getItem('TimeTable--isActBookmarked')) || []
      )
    } catch (err) {
      return []
    }
  }
}
