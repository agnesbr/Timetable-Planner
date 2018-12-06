import React, { Component } from 'react'
import styled from 'styled-components'

export const FilterWrapper = styled.nav`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 0.7em;
  width: 100%;
  font-family: DINWeb-CondBold, sans-serif;
  padding: 0 20px;
  div {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    color: var(--light);
    margin: 3px 10px;
  }
`
export default class NavBarFilterTimetable extends Component {
  render() {
    return (
      <FilterWrapper>
        <div>
          <span>ALL DAYS</span>
          <span>24/11</span>
          <span> 25/11</span>
          <span>26/11</span>
        </div>
        <div>
          <span>ALL STAGES</span>
          <span>24/11</span>
          <span> 25/11</span>
          <span>26/11</span>
        </div>
      </FilterWrapper>
    )
  }
}
