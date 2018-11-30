import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Bookmark from './Bookmark'
import PropTypes from 'prop-types'

import StyledWrapper from './StyledWrapper'

export const TimetableLink = styled(Link)`
  text-decoration: none;
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 5px;
  width: 100%;
  padding-right: 8px;
`

const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />

export default class Fest extends Component {
  static propTypes = {
    festId: PropTypes.number.isRequired,
    festName: PropTypes.string.isRequired,
    festStartDate: PropTypes.date,
    festEndDate: PropTypes.date,
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

    const festStartDateFormat = festStartDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: '2-digit',
      year: '2-digit'
    })

    const festEndDateFormat = festEndDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: '2-digit',
      year: '2-digit'
    })

    return (
      <StyledWrapper data-cy="festEl">
        <TimetableLink data-cy="festElLink" to={`/timetable/${festId}`}>
          <time dateTime={festEndDateFormat}>
            {festEndDateFormat === ''
              ? festStartDateFormat
              : festStartDateFormat + ' – ' + festEndDateFormat}
          </time>
          <h2 data-cy="festName">{festName}</h2>
          <section>
            {festCountry}
            <div className="star"> {starIcon}</div>
            {festCity}
          </section>
        </TimetableLink>
        <Bookmark
          festId={festId}
          isBookmarked={isBookmarked}
          toggleBookmark={toggleBookmark}
        />
      </StyledWrapper>
    )
  }
}
