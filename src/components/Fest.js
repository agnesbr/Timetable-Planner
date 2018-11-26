import React, { Component } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Bookmark from './Bookmark'
import PropTypes from 'prop-types'

const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />

export const Wrapper = styled.section`
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 2px solid #0e2a3f;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  grid-gap: 5px;
  grid-template-columns: 1fr 40px;
  padding: 20px 15px 21px 20px;
  width: 100%;
`

export const FestDate = styled.time`
  align-self: end;
  color: var(--teal);
  font-family: DINWeb-CondBold, sans-serif;
  font-size: 19px;
  grid-column: 1;
  grid-row: 1/2;
`

export const FestName = styled.div`
  align-self: start;
  color: var(--dark);
  font-family: FestivoLettersNo1;
  font-size: 24px;
  grid-column: 1;
  grid-row: 2;
  line-height: 24px;
`
export const FestLocation = styled.section`
  align-items: center;
  color: var(--teal);
  display: flex;
  font-family: DINWeb-CondBold, sans-serif;
  font-size: 17px;
  grid-column: 1;
  grid-row: 3;
  height: 10px;
  margin-top: 3px;
`
export const StarSmall = styled.div`
  display: inline;
  font-size: 8px;
  margin: 0px 7px 0 7px;
`

export default class Fest extends Component {
  static propTypes = {
    festId: PropTypes.number.isRequired,
    festName: PropTypes.string.isRequired,
    festStartDate: PropTypes.string.isRequired,
    festEndDate: PropTypes.string.isRequired,
    festCountry: PropTypes.string.isRequired,
    festCity: PropTypes.string.isRequired,
    isBookmarked: PropTypes.bool,
    toggleBookmark: PropTypes.func
  }

  render() {
    const {
      festId,
      festName,
      festStartDate,
      festEndDate,
      festCountry,
      festCity,
      isBookmarked,
      toggleBookmark
    } = this.props
    return (
      <Wrapper data-cy-1="festEl">
        <FestDate dateTime={festEndDate}>
          {festEndDate === ''
            ? festStartDate
            : festStartDate + ' – ' + festEndDate}
        </FestDate>
        <FestName data-cy-1="festName">{festName}</FestName>
        <FestLocation>
          {festCountry}
          <StarSmall> {starIcon}</StarSmall>
          {festCity}
        </FestLocation>
        <Bookmark
          festId={festId}
          isBookmarked={isBookmarked}
          toggleBookmark={toggleBookmark}
        />
      </Wrapper>
    )
  }
}
