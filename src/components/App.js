import React, { Component } from 'react'
import styled from 'styled-components'

import Fest from './Fest'
import NavBarBottomIcon from './NavBarBottomIcon'
import NavBar from '../components/NavBar'
import InputSearch from '../components/InputSearch'
import Counter from '../components/Counter'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faAlignCenter } from '@fortawesome/free-solid-svg-icons'

import uid from 'uid'

import festData from '../data/ef_data.json'

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

  updateSearch = inputValue => {
    this.setState({
      search: inputValue
    })
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

  createFestList() {
    const { festivals, iconIsDefault } = this.state
    const filteredFestivals = festivals.filter(festival => {
      return (
        festival.festName
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      )
    })
    if (iconIsDefault) {
      return filteredFestivals.map(this.renderSingleFest)
    } else {
      return filteredFestivals.map(
        festival =>
          this.isFestBookmarked(festival.festId) &&
          this.renderSingleFest(festival)
      )
    }
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

  countFestivals() {
    const numCounter = this.state.festivals.length
    return numCounter
  }

  render() {
    this.saveFavorites()

    return (
      <Wrapper>
        <NavBar>
          <Counter
            contentHeadline="list of available festivals"
            numCounter={this.countFestivals()}
          />
          <InputSearch onChange={this.updateSearch} />
        </NavBar>
        <DisplayContent data-cy-1="FestList">
          {this.createFestList()}
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
