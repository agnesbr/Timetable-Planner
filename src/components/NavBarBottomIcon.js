import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const WrapperIconBottom = styled.div`
  align-items: center;
  align-self: center;
  color: var(--light);
  display: flex;
  font-size: ${props => props.fontSize || 20}px;
  height: 40px;
  justify-content: center;
  width: ${props => props.width || 40}px;
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
    fontSize: PropTypes.number,
    fontSize: PropTypes.number
  }

  render() {
    const {
      iconIsDefault,
      defaultIcon,
      activeIcon,
      onClick,
      fontSize,
      width,
      dataCy
    } = this.props

    return (
      <WrapperIconBottom
        data-cy={dataCy}
        fontSize={fontSize}
        width={width}
        className={iconIsDefault ? null : 'active'}
        onClick={onClick}
      >
        {iconIsDefault ? defaultIcon : activeIcon}
      </WrapperIconBottom>
    )
  }
}
