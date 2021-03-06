import React, { Component } from 'react'
import styled from 'styled-components'
import FilterElement from './FilterElement'

export const FilterContainer = styled.nav`
  background: rgba(11, 22, 31, 0.85);
  overflow-x: scroll;
  height: 80px;
  width: 100vw;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const WrapperFilter = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: ${props => props.height || 50}px;
  padding: 3px 10px;
  margin-bottom: ${props => props.mB || 0}px;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`

export default class FilterElementsContainer extends Component {
  render() {
    const {
      stageNames,
      festDays,
      renderFilterStageNames,
      renderFilterFestDays,
      onClickClearStages,
      onClickClearDays,
      allStagesFilterActive,
      allDaysFilterActive,
    } = this.props
    return (
      <FilterContainer>
        <WrapperFilter  data-cy="filterStages" height="25">
          <FilterElement  filterName="All Stages" isActive={allStagesFilterActive} onClick={onClickClearStages} />
          {renderFilterStageNames(stageNames)}
        </WrapperFilter>
        <WrapperFilter data-cy="filterDays" height="25">
          <FilterElement  filterName="All Days" isActive={allDaysFilterActive} onClick={onClickClearDays} />{' '}
          {renderFilterFestDays(festDays)}
        </WrapperFilter>
      </FilterContainer>
    )
  }
}
