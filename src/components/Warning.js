import React, { Component } from 'react'
import IconWrapper from './styledComponents/IconWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const warningIcon = <FontAwesomeIcon className="filter-button" icon={faBolt} />

export default class Warning extends Component {
  static propTypes = {
    isTimeOverlapping: PropTypes.bool,
  }

  render() {
    const { isTimeOverlapping } = this.props

    return (
      <IconWrapper data-cy="Warning" className={isTimeOverlapping && 'warning-active'}>
        {warningIcon}
      </IconWrapper>
    )
  }
}
