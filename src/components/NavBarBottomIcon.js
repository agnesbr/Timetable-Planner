import React, { Component } from 'react'
import styled from 'styled-components'

export const WrapperIconBottom = styled.div`
  color: var(--light);
  &.active {
    color: var(--teal);
  }
`

export default class NavBarBottomIcon extends Component {
  render() {
    const { isDefault, defaultIcon, activeIcon, onClick } = this.props

    return (
      <WrapperIconBottom
        className={isDefault ? null : 'active'}
        onClick={onClick}
      >
        {isDefault ? defaultIcon : activeIcon}
      </WrapperIconBottom>
    )
  }
}
