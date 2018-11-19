import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />

export const Wrapper = styled.section`
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid #0e2a3f;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  grid-gap: 5px;
  grid-template-columns: 1fr;
  padding: 20px 15px;
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
export const FestName = styled.time`
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

export default class FestCard extends Component {
  render() {
    const {
      festId,
      festName,
      festStartDate,
      festEndDate,
      festCountry,
      festCity
    } = this.props
    return (
      <Wrapper>
        <FestDate>
          {festStartDate} – {festEndDate}
        </FestDate>
        <FestName>{festName}</FestName>
        <FestLocation>
          {festCountry}
          <StarSmall> {starIcon}</StarSmall>
          {festCity}
        </FestLocation>
      </Wrapper>
    )
  }
}
