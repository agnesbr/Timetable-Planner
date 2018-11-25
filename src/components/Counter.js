import React, { Component } from 'react'
import styled from 'styled-components'

export const StyledCounter = styled.h1`
  color: #f5f1f1;
  font-family: FestivoLettersNo1;
  font-size: 18px;
  letter-spacing: 0.05em;
  margin-bottom: 0;

  & > span {
    color: var(--orange);
  }
`

export default class Counter extends Component {
  render() {
    const { contentHeadline, numCounter } = this.props
    return (
      <StyledCounter>
        {contentHeadline}: <span>{numCounter}</span>
      </StyledCounter>
    )
  }
}
