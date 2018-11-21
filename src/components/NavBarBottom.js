import React, { Component } from 'react'
import styled from 'styled-components'

export const NavBarBottomWrapper = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: rgba(11, 22, 31, 0.8);
  font-size: 1.5em;
  color: var(--teal);
`

export default class NavBarBottom extends Component {
  render() {
    return <NavBarBottomWrapper />
  }
}
