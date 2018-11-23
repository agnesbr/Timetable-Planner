import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const WrapperIconBottom = styled.div`
  color: var(--light);
  &.active {
    color: var(--teal);
  }
`

export default class NavBarBottomIcon extends Component {
  static propTypes = {
    // defaultIcon: PropTypes.element,
    // activeIcon: PropTypes.element,
    // onClick: PropTypes.func,
    // iconIsDefault: PropTypes.bool
  }

  render() {
    const { iconIsDefault, defaultIcon, activeIcon, onClick } = this.props

    return (
      <WrapperIconBottom
        className={iconIsDefault ? null : 'active'}
        onClick={onClick}
      >
        {iconIsDefault ? defaultIcon : activeIcon}
      </WrapperIconBottom>
    )
  }
}
