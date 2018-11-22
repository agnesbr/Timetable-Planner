import React, { Component } from 'react'
import styled from 'styled-components'
import Fest from './Fest'
import NavBarBottomIcon from './NavBarBottomIcon'
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
  grid-template-rows: auto 50px;
  grid-template-columns: 1fr;
  height: 100vh;
`

export const DisplayContent = styled.section`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`
export const NavBarBottomWrapper = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: rgba(11, 22, 31, 0.8);
  font-size: 1.5em;
  color: var(--teal);
`

export default class App extends Component {
  state = {
    //isBookmarked: [{ festId: '65000145456' }, { festId: '23345adfb' }],
    isBookmarked: this.loadFavorites(),
    festivals: this.addInitialKeys(),
    isDefault: true
    // loadFavorites() || this. addInitialKeys()
  }

  addInitialKeys() {
    const isBookmarked = [{ festId: '65000145456' }, { festId: '23345adfb' }]

    const newFestData = festData.map(festival => {
      return isBookmarked.find(el => el.festId === festival.festId)
        ? { ...festival, isBookmarked: true }
        : { ...festival, isBookmarked: false }
    })
    return newFestData
  }

  toggleBookmark = id => {
    const { festivals, isBookmarked } = this.state
    const index = festivals.findIndex(f => f.festId === id)
    const festival = festivals[index]
    const newFest = [
      ...festivals.slice(0, index),
      { ...festival, isBookmarked: !festival.isBookmarked },
      ...festivals.slice(index + 1)
    ]

    const bookmarkedIndex = isBookmarked.findIndex(
      el => el.festId === festival.festId
    )

    const newIsBookmarked =
      bookmarkedIndex === -1
        ? this.addItemToIsBookmarked(index)
        : this.deleteItemFromIsBookmarked(bookmarkedIndex)

    this.setState({
      festivals: newFest,
      isBookmarked: newIsBookmarked
    })
  }

  deleteItemFromIsBookmarked = bookmarkedIndex => {
    return [
      ...this.state.isBookmarked.slice(0, bookmarkedIndex),
      ...this.state.isBookmarked.slice(bookmarkedIndex + 1)
    ]
  }

  addItemToIsBookmarked = index => {
    const { festivals, isBookmarked } = this.state
    return [...isBookmarked, { festId: festivals[index].festId }]
  }

  showBookmarkedFestivals() {
    const { festivals } = this.state
    return festivals
      .filter(festival => festival.isBookmarked)
      .map(this.renderSingleFest)
  }

  createFestList() {
    const { festivals } = this.state
    return festivals.map(this.renderSingleFest)
  }

  renderSingleFest = festival => {
    const {
      festId,
      festName,
      festStartDate,
      festEndDate,
      festCountry,
      festCity,
      isBookmarked
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
        isBookmarked={isBookmarked}
        toggleBookmark={this.toggleBookmark}
      />
    )
  }

  handleToggleButtonBookmarked = () => {
    this.setState({
      isDefault: !this.state.isDefault
    })
  }

  render() {
    this.saveFavorites()
    return (
      <Wrapper>
        <DisplayContent>
          {this.state.isDefault
            ? this.createFestList()
            : this.showBookmarkedFestivals()}
        </DisplayContent>
        <NavBarBottomWrapper>
          <NavBarBottomIcon
            defaultIcon={starIcon}
            activeIcon={listIcon}
            onClick={this.handleToggleButtonBookmarked}
            isDefault={this.state.isDefault}
          />
        </NavBarBottomWrapper>
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
