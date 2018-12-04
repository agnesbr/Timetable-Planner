import React, { Component } from 'react'
import styled from 'styled-components'
import uid from 'uid'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faAlignCenter,
  faAngleLeft,
  faSortAlphaDown,
  faClock,
  faMapMarkerAlt
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
const sortDown = (
  <FontAwesomeIcon className="filter-button" icon={faSortAlphaDown} />
)
const clock = <FontAwesomeIcon className="filter-button" icon={faClock} />
const stage = (
  <FontAwesomeIcon className="filter-button" icon={faMapMarkerAlt} />
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
    bookmarkIconIsDefault: true,
    backIconIsDefault: true,
    sortAlphaIconIsDefault: true,
    sortByTimeIsDefault: true,
    sortByStageIconIsDefault: false,
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
    const {
      bookmarkIconIsDefault,
      sortAlphaIconIsDefault,
      sortByTimeIsDefault,
      sortByStageIconIsDefault
    } = this.state

    const filteredTimeTable = timeTable.filter(
      act => bookmarkIconIsDefault || this.isActBookmarked(act.actsId)
    )
    if (sortAlphaIconIsDefault === false) {
      return filteredTimeTable
        .filter(
          act => bookmarkIconIsDefault || this.isActBookmarked(act.actsId)
        )
        .sort((a, b) => a.actName.localeCompare(b.actName))
    } else if (sortByTimeIsDefault === false) {
      return filteredTimeTable
        .filter(
          act => bookmarkIconIsDefault || this.isActBookmarked(act.actsId)
        )
        .sort((a, b) => a.actStartDate - b.actStartDate)
    } else if (sortByStageIconIsDefault === false) {
      return filteredTimeTable
        .filter(
          act => bookmarkIconIsDefault || this.isActBookmarked(act.actsId)
        )
        .sort((a, b) => a.areaName.localeCompare(b.areaName))
    }
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
    console.log(this.state)
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
              dataCy={'backToHomepage'}
              fontSize={32}
              defaultIcon={backIcon}
              activeIcon={backIcon}
              iconIsDefault={this.state.backIconIsDefault}
            />
          </NavLink>
          <NavBarBottomIcon
            dataCy={'sortActsAlpha'}
            fontSize={26}
            defaultIcon={sortDown}
            activeIcon={sortDown}
            onClick={() => this.handleButtonSortAlpha()}
            iconIsDefault={this.state.sortAlphaIconIsDefault}
          />
          <NavBarBottomIcon
            dataCy={'sortActsByTime'}
            fontSize={25}
            defaultIcon={clock}
            activeIcon={clock}
            onClick={() => this.handleButtonSortTime()}
            iconIsDefault={this.state.sortByTimeIsDefault}
          />
          <NavBarBottomIcon
            dataCy={'sortActsByStage'}
            fontSize={25}
            defaultIcon={stage}
            activeIcon={stage}
            onClick={() => this.handleButtonSortStage()}
            iconIsDefault={this.state.sortByStageIconIsDefault}
          />
          <NavBarBottomIcon
            dataCy={'showBookmarkedFestList'}
            fontSize={25}
            defaultIcon={starIcon}
            activeIcon={listIcon}
            onClick={() => this.handleToggleButtonBookmarked()}
            iconIsDefault={this.state.bookmarkIconIsDefault}
          />
        </NavBarBottom>
      </Wrapper>
    )
  }
  handleToggleButtonBookmarked = () => {
    this.setState({
      bookmarkIconIsDefault: !this.state.bookmarkIconIsDefault
    })
  }
  handleButtonSortAlpha = () => {
    this.setState({
      sortAlphaIconIsDefault: false,
      sortByTimeIsDefault: true,
      sortByStageIconIsDefault: true
    })
  }
  handleButtonSortTime = () => {
    this.setState({
      sortAlphaIconIsDefault: true,
      sortByTimeIsDefault: false,
      sortByStageIconIsDefault: true
    })
  }
  handleButtonSortStage = () => {
    this.setState({
      sortAlphaIconIsDefault: true,
      sortByTimeIsDefault: true,
      sortByStageIconIsDefault: false
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
