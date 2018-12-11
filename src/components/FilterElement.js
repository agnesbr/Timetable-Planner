import React, { Component } from 'react'
import styled from 'styled-components'

export const FilterEl = styled.h4`
  color: var(--dark);
  display: flex;
  font-family: "DINWeb-CondBold", sans-serif;
  font-size: 1.1em;
  height: 25px;
  letter-spacing: 0.01em;
  margin: 3px;
  padding: 3px 5px 10px 5px;
  white-space: nowrap;
  background: var(--teal);

  &.filter-active {
    color: var(--light);
    background: var(--purple);
  }
`

export default class FilterElement extends Component {
  render() {
    const { filterName, isActive, onClick } = this.props
    return (
      <FilterEl className={isActive && 'filter-active'} onClick={() => onClick()}>
        {filterName}
      </FilterEl>
    )
  }
}
