import React, { Component } from 'react'
import styled from 'styled-components'

export const StyledHeadline = styled.h3`
  align-items: center;
  background: var(--purple);
  color: var(--light);
  display: flex;
  flex-grow: 1;
  font-family: "DINWeb-CondBold", sans-serif;
  font-size: 1.5em;
  justify-content: center;
  letter-spacing: 0.01em;
  margin: 0 3px;
  min-width: 250px;
  padding: 5px 20px 0 20px;
  word-wrap: break-word;

  :first-child {
    margin-left: 7px;
  }

  :last-child {
    margin-right: 7px;
  }
`

export default class StageName extends Component {
  render() {
    const { stageName } = this.props
    return <StyledHeadline>{stageName}</StyledHeadline>
  }
}
