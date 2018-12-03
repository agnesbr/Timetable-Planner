import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const WrapperIconBottom = styled.div`
  font-size: ${props => props.fontSize || 20}px;
  color: var(--light);
  &.active {
    color: var(--teal);
  }
`

export default class NavBarBottomIcon extends Component {
  static propTypes = {
    defaultIcon: PropTypes.element,
    activeIcon: PropTypes.element,
    onClick: PropTypes.func,
    iconIsDefault: PropTypes.bool,
    dataCy: PropTypes.string,
    fontSize: PropTypes.number
  }

  render() {
    const {
      iconIsDefault,
      defaultIcon,
      activeIcon,
      onClick,
      fontSize,
      dataCy
    } = this.props

    return (
      <WrapperIconBottom
        data-cy={dataCy}
        fontSize={fontSize}
        className={iconIsDefault ? null : 'active'}
        onClick={onClick}
      >
        {iconIsDefault ? defaultIcon : activeIcon}
      </WrapperIconBottom>
    )
  }
}
