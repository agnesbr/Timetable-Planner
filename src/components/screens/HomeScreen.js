import React, { Component } from 'react'
import styled from 'styled-components'
import uid from 'uid'

import Fest from '../Fest'
import NavBarBottomIcon from '../NavBarBottomIcon'
import NavBar from '../NavBar'
import NavBarBottom from '../NavBarBottom'
import InputSearch from '../InputSearch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faAlignCenter,
  faSortAlphaDown
} from '@fortawesome/free-solid-svg-icons'

const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />
const listIcon = (
  <FontAwesomeIcon className="filter-button" icon={faAlignCenter} />
)
const sortDown = (
  <FontAwesomeIcon className="filter-button" icon={faSortAlphaDown} />
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

export const StyledCounter = styled.h1`
  & > span {
    color: var(--orange);
  }
`

export default class HomeScreen extends Component {
  state = {
    isFestBookmarked: this.loadFavoriteFests(),
    search: '',
    bookmarkIconIsDefault: true,
    sortAlphaIconIsDefault: true,
    sortByDateIsDefault: true
  }

  isFestBookmarked(festId) {
    const { isFestBookmarked } = this.state
    return isFestBookmarked.includes(festId)
  }

  toggleBookmark = festId => {
    const { isFestBookmarked } = this.state

    const newIsFestBookmarked = isFestBookmarked.includes(festId)
      ? this.deleteItemFromIsFestBookmarked(festId)
      : this.addItemToIsFestBookmarked(festId)

    this.setState({
      isFestBookmarked: newIsFestBookmarked
    })
  }

  deleteItemFromIsFestBookmarked = festId => {
    const { isFestBookmarked } = this.state
    const bookmarkedIndex = isFestBookmarked.indexOf(festId)
    const newIsFestBookmarked = [
      ...isFestBookmarked.slice(0, bookmarkedIndex),
      ...isFestBookmarked.slice(bookmarkedIndex + 1)
    ]

    return newIsFestBookmarked
  }

  addItemToIsFestBookmarked = festId => {
    const { isFestBookmarked } = this.state
    const newIsFestBookmarked = isFestBookmarked.includes(festId)
      ? [...isFestBookmarked]
      : [...isFestBookmarked, festId]

    return newIsFestBookmarked
  }

  getSelectedFestList = () => {
    const { bookmarkIconIsDefault } = this.state
    const { festivals } = this.props
    return festivals
      .filter(
        festival =>
          festival.festName
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1
      )
      .filter(
        festival =>
          bookmarkIconIsDefault || this.isFestBookmarked(festival.festId)
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
      festCity,
      ...rest
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
        rest={rest}
      />
    )
  }

  handleToggleButtonBookmarked = () => {
    this.setState({
      bookmarkIconIsDefault: !this.state.bookmarkIconIsDefault
    })
  }

  render() {
    this.saveFavoriteFests()

    return (
      <Wrapper>
        <NavBar>
          <StyledCounter>
            list of available festivals{' '}
            <span>{this.getSelectedListLength()}</span>
          </StyledCounter>
          <InputSearch onChange={this.updateSearch} />
        </NavBar>
        <DisplayContent data-cy="FestList">
          {this.createFestList()}
        </DisplayContent>
        <NavBarBottom className="center">
          <NavBarBottomIcon
            dataCy={'sortActsAlpha'}
            fontSize={26}
            width={40}
            defaultIcon={sortDown}
            activeIcon={sortDown}
            onClick={() => this.handleButtonSortAlpha()}
            iconIsDefault={this.state.sortAlphaIconIsDefault}
          />
          <NavBarBottomIcon
            dataCy={'showBookmarkedFestList'}
            fontSize={25}
            width={40}
            defaultIcon={starIcon}
            activeIcon={listIcon}
            onClick={() => this.handleToggleButtonBookmarked()}
            iconIsDefault={this.state.bookmarkIconIsDefault}
          />
        </NavBarBottom>
      </Wrapper>
    )
  }

  saveFavoriteFests() {
    localStorage.setItem(
      'TimeTable--isFestBookmarked',
      JSON.stringify(this.state.isFestBookmarked)
    )
  }

  loadFavoriteFests() {
    try {
      return (
        JSON.parse(localStorage.getItem('TimeTable--isFestBookmarked')) || []
      )
    } catch (err) {
      return []
    }
  }
}
