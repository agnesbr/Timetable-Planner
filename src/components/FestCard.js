import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />

export const Wrapper = styled.section`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: 1fr 60px;
  grid-auto-rows: minmax(5px, auto);
  grid-auto-flow: row;
  width: 100%;
  border-bottom: 2px solid #0e2a3f;
  padding: 20px 15px;
  background: rgba(255, 255, 255, 0.8);
`

export const FestDate = styled.time`
  color: var(--purple);
  font-size: 19px;
  font-family: DINWeb-CondBold, sans-serif;
  grid-row: 1/2;
  grid-column: 1;
`
export const FestName = styled.time`
  color: var(--dark);
  color: #0b161f;
  grid-row: 2;
  grid-column: 1;
  font-size: 24px;
  line-height: 24px;
  font-family: FestivoLettersNo1;
`
export const FestLocation = styled.section`
  color: var(--teal);
  font-size: 17px;
  font-family: DINWeb-CondBold, sans-serif;
  grid-row: 3;
  grid-column: 1;
  height: 10px;
`

export const StarSmall = styled.div`
  display: inline;
  font-size: 8px;
  margin: 0px 10px 10px 10px;
  padding-bottom: 10px;
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
