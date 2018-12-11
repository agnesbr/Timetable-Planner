import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import Act from '../Act'
import StageName from '../StageName'
import InputSearch from '../InputSearch'
import FilterElement from '../FilterElement'
import NavBarBottomIcon from '../NavBarBottomIcon'
import StageNamesContainer from '../StageNamesContainer'
import FilterElementsContainer from '../FilterElementsContainer'

import styled from 'styled-components'
import NavBar from '../styledComponents/NavBar'
import NavBarBottom from '../styledComponents/NavBarBottom'
import DisplayMainContent from '../styledComponents/DisplayMainContent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faAlignCenter,
  faAngleLeft,
  faSortAlphaDown,
  faClock,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'

const backIcon = <FontAwesomeIcon className="filter-button" icon={faAngleLeft} />
const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />
const listIcon = <FontAwesomeIcon className="filter-button" icon={faAlignCenter} />
const sortDownIcon = <FontAwesomeIcon className="filter-button" icon={faSortAlphaDown} />
const clockIcon = <FontAwesomeIcon className="filter-button" icon={faClock} />
const stageIcon = <FontAwesomeIcon className="filter-button" icon={faMapMarkerAlt} />

export const Wrapper = styled.section`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 120px 65px auto 50px;
  height: 100vh;
`

export const ContentInner = styled.section`
  display: block;
  flex-direction: column;

  main {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`

export const InnerColumn = styled.section`
  min-width: 250px;
  margin: 0 3px;
  flex-grow: 1;

  :first-child {
    margin-left: 7px;
  }

  :last-child {
    margin-right: 7px;
  }
`

export const Homelink = styled(Link)`
  display: block;
`

export default class TimetableScreen extends Component {
  state = {
    listOfBookmarkedActs: this.loadFavoriteActs(),
    bookmarkIconIsActive: false,
    backIconIsActive: false,
    sortAlphaIconIsActive: false,
    sortByTimeIsActive: false,
    sortByStageIconIsActive: true,
    search: '',
    stageFilterActive: [],
    daysFilterActive: [],
    allStagesFilterActive: true,
    allDaysFilterActive: true,
  }

  componentWillMount() {
    const { festivals, festId } = this.props
    const festObject = this.getFestById(festivals, festId)
    this.setState({
      festObject: festObject,
      stageNames: this.getUniqueStages(festObject),
      festDays: this.getUniqueDays(festObject),
    })
  }

  getUniqueStages = festObject => {
    const timeTable = festObject.timeTable
    const allStages = timeTable.map(act => act.areaName)
    return [ ...new Set(allStages) ]
  }

  getUniqueDays = festObject => {
    const timeTable = festObject.timeTable
    const allDays = timeTable.map(act =>
      act.actStartDate.toLocaleDateString('en-GB', {
        weekday: 'short',
      })
    )
    return [ ...new Set(allDays) ]
  }

  updateSearch = inputValue => {
    this.setState({
      search: inputValue,
    })
  }

  toggleBookmark = actsId => {
    const { listOfBookmarkedActs } = this.state
    const newListOfBookmarkedActs = listOfBookmarkedActs.includes(actsId)
      ? this.deleteItemFromActIsBookmarked(actsId)
      : this.addItemToListOfBookmarkedActs(actsId)

    this.setState({
      listOfBookmarkedActs: newListOfBookmarkedActs,
    })
  }

  deleteItemFromActIsBookmarked = actsId => {
    const { listOfBookmarkedActs } = this.state
    const bookmarkedIndex = listOfBookmarkedActs.indexOf(actsId)
    const newListOfBookmarkedActs = [
      ...listOfBookmarkedActs.slice(0, bookmarkedIndex),
      ...listOfBookmarkedActs.slice(bookmarkedIndex + 1),
    ]

    return newListOfBookmarkedActs
  }

  addItemToListOfBookmarkedActs = actsId => {
    const { listOfBookmarkedActs } = this.state
    const newListOfBookmarkedActs = listOfBookmarkedActs.includes(actsId)
      ? [ ...listOfBookmarkedActs ]
      : [ ...listOfBookmarkedActs, actsId ]

    return newListOfBookmarkedActs
  }

  isActBookmarked(actsId) {
    const { listOfBookmarkedActs } = this.state
    return listOfBookmarkedActs.includes(actsId)
  }

  isStageActive(areaName) {
    const { stageFilterActive, stageNames } = this.state
    return stageFilterActive[stageNames.indexOf(areaName)]
  }

  isDayActive(actStartDate) {
    const { daysFilterActive, festDays } = this.state
    return daysFilterActive[
      festDays.indexOf(
        actStartDate.toLocaleDateString('en-GB', {
          weekday: 'short',
        })
      )
    ]
  }

  getSelectedActList = timeTable => {
    const {
      bookmarkIconIsActive,
      sortAlphaIconIsActive,
      sortByTimeIsActive,
      sortByStageIconIsActive,
      allStagesFilterActive,
      allDaysFilterActive,
    } = this.state

    const filteredTimeTable = timeTable
      .filter(act => act.actName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
      .filter(act => !bookmarkIconIsActive || this.isActBookmarked(act.actsId))
      .filter(act => allStagesFilterActive || this.isStageActive(act.areaName))
      .filter(act => allDaysFilterActive || this.isDayActive(act.actStartDate))

    if (sortAlphaIconIsActive) {
      return filteredTimeTable.sort((a, b) => a.actName.localeCompare(b.actName))
    } else if (sortByTimeIsActive) {
      return filteredTimeTable.sort((a, b) => a.actStartDate - b.actStartDate)
    } else if (sortByStageIconIsActive) {
      return filteredTimeTable.sort((a, b) => a.areaName.localeCompare(b.areaName))
    }
  }

  createActList() {
    const { festObject } = this.state
    return this.getSelectedActList(festObject.timeTable).map(this.renderSingleAct)
  }

  renderSingleAct = act => {
    const { actEndDate, actName, actStartDate, actsId, areaName } = act
    return (
      <Act
        key={actsId}
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

  shortenString = (string, num) => {
    if (string.length > num) {
      return string.slice(0, num - 1) + ' …'
    }
    return string
  }

  renderFilterStageNames = () => {
    const { stageNames } = this.state
    return stageNames.map((stageName, index) => (
      <FilterElement
        key={index}
        onClick={() => this.handleStageFilter(index)}
        filterName={stageName}
        isActive={this.state.stageFilterActive[index]}
      />
    ))
  }

  handleStageFilter = id => {
    const activeStages = this.state.stageFilterActive
    activeStages[id] = !activeStages[id]
    this.setState({
      stageFilterActive: activeStages,
      allStagesFilterActive: false,
    })
  }

  clearStageFilterActive = () => {
    this.setState({
      stageFilterActive: [],
      allStagesFilterActive: true,
    })
  }

  renderFilterFestDays = () => {
    const { festDays } = this.state
    return festDays.map((festDay, index) => (
      <FilterElement
        key={index}
        onClick={() => this.handleDaysFilter(index)}
        isActive={this.state.daysFilterActive[index]}
        filterName={festDay}
      />
    ))
  }

  handleDaysFilter = id => {
    const activeDays = this.state.daysFilterActive
    activeDays[id] = !activeDays[id]
    this.setState({
      daysFilterActive: activeDays,
      allDaysFilterActive: false,
    })
  }

  clearDaysFilterActive = () => {
    this.setState({
      daysFilterActive: [],
      allDaysFilterActive: true,
    })
  }

  renderStageNames = num => {
    const { stageNames } = this.state
    return stageNames
      .map(stageName => {
        return this.shortenString(stageName, num)
      })
      .map((stageName, index) => <StageName key={index} stageName={stageName} />)
  }

  divideTimetableIntoStages = () => {
    const { festObject } = this.state
    const uniqueStages = this.getUniqueStages(festObject)

    const stageObject = uniqueStages.map(stage => festObject.timeTable.filter(act => act.areaName === stage))
    return stageObject.map((stage, index) => (
      <InnerColumn key={index}>{this.getSelectedActList(stage).map(act => this.renderSingleAct(act))}</InnerColumn>
    ))
  }

  handleToggleButtonBookmarked = () => {
    this.setState({
      bookmarkIconIsActive: !this.state.bookmarkIconIsActive,
    })
  }

  handleButtonSort = name => {
    this.setState({
      sortAlphaIconIsActive: name === 'alpha',
      sortByTimeIsActive: name === 'time',
      sortByStageIconIsActive: name === 'stage',
    })
  }

  render() {
    this.saveFavoriteActs()
    const headline = this.state.festObject.festName

    return (
      <Wrapper>
        <NavBar height="200">
          <h1>{this.shortenString(headline, 30)}</h1>
          <InputSearch placeholder="Search for act name" onChange={this.updateSearch} />
        </NavBar>
        <FilterElementsContainer
          onClickClearStages={() => this.clearStageFilterActive()}
          onClickClearDays={() => this.clearDaysFilterActive()}
          stageNames={this.state.stageNames}
          festDays={this.state.festDays}
          renderFilterStageNames={this.renderFilterStageNames}
          renderFilterFestDays={this.renderFilterFestDays}
          height="50"
          allStagesFilterActive={this.state.allStagesFilterActive}
          allDaysFilterActive={this.state.allDaysFilterActive}
        />
        {this.state.sortByStageIconIsActive ? (
          <DisplayMainContent data-cy="ActsList" width="100">
            <StageNamesContainer stageNames={this.state.stageNames} renderStageNames={this.renderStageNames} />
            <ContentInner>
              {
                <main>
                  {this.state.sortByStageIconIsActive}
                  {this.divideTimetableIntoStages(this.state.festObject)}
                </main>
              }
            </ContentInner>
          </DisplayMainContent>
        ) : (
          <DisplayMainContent data-cy="ActsList" width="96">
            {this.createActList(this.state.festObject)}
          </DisplayMainContent>
        )}
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
            name="alpha"
            defaultIcon={sortDownIcon}
            activeIcon={sortDownIcon}
            onClick={() => this.handleButtonSort('alpha')}
            iconIsActive={this.state.sortAlphaIconIsActive}
          />
          <NavBarBottomIcon
            dataCy="sortActsByTime"
            fontSize="25"
            width="40"
            name="time"
            defaultIcon={clockIcon}
            activeIcon={clockIcon}
            onClick={() => this.handleButtonSort('time')}
            iconIsActive={this.state.sortByTimeIsActive}
          />
          <NavBarBottomIcon
            dataCy="sortActsByStageIcon"
            fontSize="25"
            width="40"
            name="stage"
            defaultIcon={stageIcon}
            activeIcon={stageIcon}
            onClick={() => this.handleButtonSort('stage')}
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

  saveFavoriteActs() {
    localStorage.setItem('TimeTable--listOfBookmarkedActs', JSON.stringify(this.state.listOfBookmarkedActs))
  }

  loadFavoriteActs() {
    try {
      return JSON.parse(localStorage.getItem('TimeTable--listOfBookmarkedActs')) || []
    } catch (err) {
      return []
    }
  }
}
