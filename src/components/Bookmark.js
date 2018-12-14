import React, { Component } from 'react'
import IconWrapper from './styledComponents/IconWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />

export default class Bookmark extends Component {
  static propTypes = {
    isBookmarked: PropTypes.bool,
    toggleBookmark: PropTypes.func.isRequired,
  }

  render() {
    const { id, isBookmarked, toggleBookmark } = this.props

    return (
      <IconWrapper data-cy="Bookmark" className={isBookmarked && 'bookmark-active'} onClick={() => toggleBookmark(id)}>
        {starIcon}
      </IconWrapper>
    )
  }
}
