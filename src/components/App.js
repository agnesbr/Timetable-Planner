import React, { Component } from 'react'
import styled from 'styled-components'
import Fest from './Fest'

import festData from '../data/ef_data.json'

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
`

export default class App extends Component {
  state = {
    festivals: festData,
    isBookmarked:
      this.props.isBookmarked == null ? true : this.props.isBookmarked

    // festivals: this.load()
  }

  toggleBookmark = id => {
    const { festivals } = this.state
    const index = festivals.findIndex(f => f.festId === id)
    const festival = festivals[index]
    this.setState({
      festivals: [
        ...festivals.slice(0, index),
        {
          ...festival,
          isBookmarked:
            festival.isBookmarked == null ? true : !festival.isBookmarked
        },
        ...festivals.slice(index + 1)
      ]
    })
  }

  showBookmarkedFestivals() {
    return this.state.festivals
      .filter(festival => !festival.isBookmarked)
      .map(this.renderSingleFest)
  }

  createFestList() {
    return this.state.festivals.map(this.renderSingleFest)
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
        key={festId}
        festId={festId}
        festName={festName}
        festStartDate={festStartDate}
        festEndDate={festEndDate}
        festCountry={festCountry}
        festCity={festCity}
        isBookmarked={isBookmarked}
        toggleBookmark={() => this.toggleBookmark(festId)}
      />
    )
  }

  render() {
    //this.save()

    return (
      <Wrapper>
        <DisplayContent>{this.createFestList()}</DisplayContent>
      </Wrapper>
    )
  }

  // save() {
  //   localStorage.setItem(
  //     'TimeTable--isBookmarked',
  //     JSON.stringify(this.state.isBookmarked)
  //   )
  // }

  // load() {
  //   try {
  //     return JSON.parse(localStorage.getItem('TimeTable--isBookmarked')) || []
  //   } catch (err) {
  //     return []
  //   }
  // }
}
