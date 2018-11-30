import React, { Component } from 'react'
import StyledWrapper from './StyledWrapper'
import styled from 'styled-components'
import Bookmark from './Bookmark'
import PropTypes from 'prop-types'

export const Div = styled.div`
  text-decoration: none;
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 5px;
  width: 100%;
`

export default class Act extends Component {
  static propTypes = {
    areaName: PropTypes.string.isRequired,
    actName: PropTypes.string.isRequired,
    actStartDate: PropTypes.func,
    actEndDate: PropTypes.func
  }

  render() {
    const {
      actsId,
      areaName,
      actName,
      actStartDate,
      actEndDate,
      isBookmarked,
      toggleBookmark
    } = this.props

    const playDay = actStartDate.toLocaleDateString('en-GB', {
      weekday: 'short'
    })

    const actStartTime = actStartDate.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })

    const actEndTime = actEndDate.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })

    return (
      <StyledWrapper>
        <Div>
          <section>{areaName}</section>
          <h2>{actName}</h2>
          <time>
            {playDay}, {actStartTime} – {actEndTime}
          </time>
        </Div>
        <Bookmark
          id={actsId}
          isBookmarked={isBookmarked}
          toggleBookmark={toggleBookmark}
        />
      </StyledWrapper>
    )
  }
}
