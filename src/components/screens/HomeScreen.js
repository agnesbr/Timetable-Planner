import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Fest from '../Fest'
import NavBarBottomIcon from '../NavBarBottomIcon'
import NavBar from '../NavBar'
import InputSearch from '../InputSearch'
import FestivalPage from '../FestivalPage'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faAlignCenter } from '@fortawesome/free-solid-svg-icons'

import uid from 'uid'

import festData from '../../data/ef_data.json'

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

export default class HomeScreen extends Component {
  state = {
    festivals: festData,
    isBookmarked: this.loadFavorites(),
    iconIsDefault: true,
    search: '',
    homeMounted: true
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
      iconIsDefault: !this.state.iconIsDefault
    })
  }

  componentWillMount() {
    console.log('CompWillMount')
  }

  componentDidlMount() {
    console.log('CompDidMount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(' shouldComponentUpdate', nextProps, nextState)
    return true
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', nextProps, nextState)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevProps, prevState)
  }

  componentWillUnmount(prevProps, prevState) {
    console.log('componentWillUnmount')
  }

  onChangeHomeMounted() {
    this.setState({
      homeMounted: !this.state.homeMounted
    })
  }

  render() {
    this.saveFavorites()
    let homeComp = ''
    if (this.state.homeMounted) {
      homeComp = (
        <DisplayContent>
          <h1>test test</h1>
          {this.createFestList()}
        </DisplayContent>
      )
    }
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
