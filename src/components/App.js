import React, { Component } from 'react'
import styled from 'styled-components'

import Fest from './Fest'
import NavBarBottomIcon from './NavBarBottomIcon'
import NavBarBottom from '../components/NavBarBottom'
import NavBarTop from '../components/NavBarTop'
//import InputSearch from '../components/InputSearch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faAlignCenter } from '@fortawesome/free-solid-svg-icons'

import uid from 'uid'

import festData from '../data/ef_data.json'

const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />
const listIcon = (
  <FontAwesomeIcon className="filter-button" icon={faAlignCenter} />
)

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const InputSearchEl = styled.input`
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  outline: none;
  margin: 5px 1px 3px 0px;
  border: 1px solid #dddddd;
  font-size: 0.8em;
  border-radius: 10px;
  width: 100%;
  font-family: FestivoLettersNo1;
  outline: none;
  padding: 10px 40px 8px 10px;

  input:focus {
    padding: 3px 3px 3px 3px;
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    border: 10px solid rgba(81, 203, 238, 1);
  }
`

export const InputImg = styled.div`
  position: absolute;
  background-color: yellow;
  bottom: 7px;
  right: 7px;
  width: 24px;
  height: 24px;
  z-index: 1;
  background-image: url('../../images/search-icon.png');
`

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

  showBookmarkedFestivals() {
    const { festivals } = this.state
    return festivals.map(
      festival =>
        this.isFestBookmarked(festival.festId) &&
        this.renderSingleFest(festival)
    )
  }

  createFestList() {
    const { festivals } = this.state
    const filteredFestivals = festivals.filter(festival => {
      return (
        festival.festName
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      )
    })
    return filteredFestivals.map(this.renderSingleFest)
  }

  updateSerach = event => {
    this.setState({
      search: event.target.value.substr(0, 3)
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

  render() {
    this.saveFavorites()

    return (
      <Wrapper>
        <NavBarTop>
          {/* <InputSearch
            stateSearch={this.state.search}
            onKeyUp={() => this.updateSerach()}
            onChange={() => this.updateSerach()}
          /> */}
          <InputWrapper>
            <InputSearchEl
              data-cy="InputSearch"
              type="text"
              value={this.state.search}
              onChange={this.updateSerach}
            />
            <InputImg />
          </InputWrapper>
        </NavBarTop>
        <DisplayContent data-cy="FestList">
          {this.state.iconIsDefault
            ? this.createFestList()
            : this.showBookmarkedFestivals()}
        </DisplayContent>
        <NavBarBottom>
          <NavBarBottomIcon
            defaultIcon={starIcon}
            activeIcon={listIcon}
            onClick={() => this.handleToggleButtonBookmarked()}
            iconIsDefault={this.state.iconIsDefault}
          />
        </NavBarBottom>
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
