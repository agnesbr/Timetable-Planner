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
import InputSearch from '../InputSearch'

const backIcon = (
  <FontAwesomeIcon className="filter-button" icon={faAngleLeft} />
)
const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />
const listIcon = (
  <FontAwesomeIcon className="filter-button" icon={faAlignCenter} />
)
const sortDownIcon = (
  <FontAwesomeIcon className="filter-button" icon={faSortAlphaDown} />
)
const clockIcon = <FontAwesomeIcon className="filter-button" icon={faClock} />
const stageIcon = (
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
    bookmarkIconIsActive: false,
    backIconIsActive: false,
    sortAlphaIconIsActive: false,
    sortByTimeIsActive: false,
    sortByStageIconIsActive: true,
    listOfBookmarkedActs: this.loadFavoriteActs(),
    search: ''
  }

  updateSearch = inputValue => {
    this.setState({
      search: inputValue
    })
  }

  toggleBookmark = actsId => {
    const { listOfBookmarkedActs } = this.state

    const newListOfBookmarkedActs = listOfBookmarkedActs.includes(actsId)
      ? this.deleteItemFromActIsBookmarked(actsId)
      : this.addItemToListOfBookmarkedActs(actsId)

    this.setState({
      listOfBookmarkedActs: newListOfBookmarkedActs
    })
  }

  deleteItemFromActIsBookmarked = actsId => {
    const { listOfBookmarkedActs } = this.state
    const bookmarkedIndex = listOfBookmarkedActs.indexOf(actsId)
    const newListOfBookmarkedActs = [
      ...listOfBookmarkedActs.slice(0, bookmarkedIndex),
      ...listOfBookmarkedActs.slice(bookmarkedIndex + 1)
    ]

    return newListOfBookmarkedActs
  }

  addItemToListOfBookmarkedActs = actsId => {
    const { listOfBookmarkedActs } = this.state
    const newListOfBookmarkedActs = listOfBookmarkedActs.includes(actsId)
      ? [...listOfBookmarkedActs]
      : [...listOfBookmarkedActs, actsId]

    return newListOfBookmarkedActs
  }

  isActBookmarked(actsId) {
    const { listOfBookmarkedActs } = this.state
    return listOfBookmarkedActs.includes(actsId)
  }

  getSelectedActList = timeTable => {
    const {
      bookmarkIconIsActive,
      sortAlphaIconIsActive,
      sortByTimeIsActive,
      sortByStageIconIsActive
    } = this.state

    const filteredTimeTable = timeTable
      .filter(
        act =>
          act.actName.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
      )
      .filter(act => !bookmarkIconIsActive || this.isActBookmarked(act.actsId))

    if (!sortAlphaIconIsActive) {
      return filteredTimeTable.sort((a, b) =>
        a.actName.localeCompare(b.actName)
      )
    } else if (!sortByTimeIsActive) {
      return filteredTimeTable.sort((a, b) => a.actStartDate - b.actStartDate)
    } else if (!sortByStageIconIsActive) {
      return filteredTimeTable.sort((a, b) =>
        a.areaName.localeCompare(b.areaName)
      )
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

  shortenFestName = (headline, num) => {
    if (headline.length > num) {
      return headline.slice(0, num - 3) + '...'
    } else {
      return headline
    }
  }

  render() {
    this.saveFavoriteActs()
    const { festivals, festId } = this.props
    const festObject = this.getFestById(festivals, festId)
    const headline = festObject.festName
    return (
      <Wrapper>
        <NavBar>
          {<h1> {this.shortenFestName(headline, 35)}</h1>}
          <InputSearch
            placeholder="Search for act name"
            onChange={this.updateSearch}
          />
        </NavBar>
        <DisplayContent data-cy="ActsList">
          {this.createActList(festObject)}
        </DisplayContent>
        <NavBarBottom className="space-between">
          <NavLink to="/">
            <NavBarBottomIcon
              dataCy="backToHomepage"
              fontSize="32"
              width="40"
              defaultIcon={backIcon}
              activeIcon={backIcon}
              iconIsActive={this.state.backIconIsActive}
            />
          </NavLink>
          <NavBarBottomIcon
            dataCy="sortActsAlpha"
            fontSize="26"
            width="40"
            defaultIcon={sortDownIcon}
            activeIcon={sortDownIcon}
            onClick={() => this.handleButtonSortAlpha()}
            iconIsActive={this.state.sortAlphaIconIsActive}
          />
          <NavBarBottomIcon
            dataCy="sortActsByTime"
            fontSize="25"
            width="40"
            defaultIcon={clockIcon}
            activeIcon={clockIcon}
            onClick={() => this.handleButtonSortTime()}
            iconIsActive={this.state.sortByTimeIsActive}
          />
          <NavBarBottomIcon
            dataCy="sortActsByStageIcon"
            fontSize="25"
            width="40"
            defaultIcon={stageIcon}
            activeIcon={stageIcon}
            onClick={() => this.handleButtonSortStage()}
            iconIsActive={this.state.sortByStageIconIsActive}
          />
          <NavBarBottomIcon
            dataCy="showBookmarkedActsList"
            fontSize="25"
            width="40"
            defaultIcon={starIcon}
            activeIcon={listIcon}
            onClick={() => this.handleToggleButtonBookmarked()}
            iconIsActive={this.state.bookmarkIconIsActive}
          />
        </NavBarBottom>
      </Wrapper>
    )
  }
  handleToggleButtonBookmarked = () => {
    this.setState({
      bookmarkIconIsActive: !this.state.bookmarkIconIsActive
    })
  }
  handleButtonSortAlpha = () => {
    this.setState({
      sortAlphaIconIsActive: true,
      sortByTimeIsActive: false,
      sortByStageIconIsActive: false
    })
  }
  handleButtonSortTime = () => {
    this.setState({
      sortAlphaIconIsActive: false,
      sortByTimeIsActive: true,
      sortByStageIconIsActive: false
    })
  }
  handleButtonSortStage = () => {
    this.setState({
      sortAlphaIconIsActive: false,
      sortByTimeIsActive: false,
      sortByStageIconIsActive: true
    })
  }

  saveFavoriteActs() {
    localStorage.setItem(
      'TimeTable--listOfBookmarkedActs',
      JSON.stringify(this.state.listOfBookmarkedActs)
    )
  }

  loadFavoriteActs() {
    try {
      return (
        JSON.parse(localStorage.getItem('TimeTable--listOfBookmarkedActs')) ||
        []
      )
    } catch (err) {
      return []
    }
  }
}
