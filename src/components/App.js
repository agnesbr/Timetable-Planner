import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Fest from './Fest'
import NavBarBottomIcon from './NavBarBottomIcon'
import NavBar from '../components/NavBar'
import InputSearch from '../components/InputSearch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faAlignCenter } from '@fortawesome/free-solid-svg-icons'

import uid from 'uid'

import festData from '../data/ef_data.json'
import FestivalPage from './FestivalPage'

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

export default class App extends Component {
  state = {
    festivals: festData,
    isBookmarked: this.loadFavorites(),
    iconIsDefault: true,
    search: ''
  }

  isFestBookmarked(festId) {
    const { isBookmarked } = this.state
    return isBookmarked.includes(festId)
  }

  toggleBookmark = festId => {
    const { isBookmarked } = this.state

    const newIsBookmarked = isBookmarked.includes(festId)
      ? this.deleteItemFromIsBookmarked(festId)
      : this.addItemToIsBookmarked(festId)

    this.setState({
      isBookmarked: newIsBookmarked
    })
  }

  deleteItemFromIsBookmarked = festId => {
    const { isBookmarked } = this.state
    const bookmarkedIndex = isBookmarked.indexOf(festId)
    const newIsBookmarked = [
      ...isBookmarked.slice(0, bookmarkedIndex),
      ...isBookmarked.slice(bookmarkedIndex + 1)
    ]

    return newIsBookmarked
  }

  addItemToIsBookmarked = festId => {
    const { isBookmarked } = this.state
    const newIsBookmarked = isBookmarked.includes(festId)
      ? [...isBookmarked]
      : [...isBookmarked, festId]

    return newIsBookmarked
  }

  getSelectedFestList = () => {
    const { festivals, iconIsDefault } = this.state

    return festivals
      .filter(
        festival =>
          festival.festName
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1
      )
      .filter(
        festival => iconIsDefault || this.isFestBookmarked(festival.festId)
      )
  }

  getSelectedListLength = () => {
    return this.getSelectedFestList().length
  }

  createFestList() {
    return this.getSelectedFestList().map(this.renderSingleFest)
  }

  updateSearch = inputValue => {
    this.setState({
      search: inputValue
    })
  }

  renderSingleFest = festival => {
    const {
      festId,
      festName,
      festStartDate,
      festEndDate,
      festCountry,
      festCity
    } = festival

    return (
      <Fest
        key={uid()}
        festId={festId}
        festName={festName}
        festStartDate={festStartDate}
        festEndDate={festEndDate}
        festCountry={festCountry}
        festCity={festCity}
        isBookmarked={this.isFestBookmarked(festId)}
        toggleBookmark={this.toggleBookmark}
      />
    )
  }

  handleToggleButtonBookmarked = () => {
    this.setState({
      iconIsDefault: !this.state.iconIsDefault
    })
  }

  getFestById = festId => {
    console.log(festId, this.state.festivals)
    return this.state.festivals.find(fest => fest.festId.toString() === festId)
  }

  render() {
    this.saveFavorites()

    return (
      <Router>
        <Wrapper>
          <NavBar>
            <h1>
              list of available festivals ({this.getSelectedListLength()})
            </h1>
            <InputSearch onChange={this.updateSearch} />
          </NavBar>
          <DisplayContent data-cy="FestList">
            <Route path="/" exact render={() => this.createFestList()} />
            <Route
              path="/festival/:festId"
              render={({ match }) => (
                <FestivalPage data={this.getFestById(match.params.festId)} />
              )}
            />
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

  saveFavorites() {
    localStorage.setItem(
      'TimeTable--isBookmarked',
      JSON.stringify(this.state.isBookmarked)
    )
  }

  loadFavorites() {
    try {
      return JSON.parse(localStorage.getItem('TimeTable--isBookmarked')) || []
    } catch (err) {
      return []
    }
  }
}
