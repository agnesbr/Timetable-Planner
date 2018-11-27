import React, { Component } from 'react'
import StyledWrapper from './StyledWrapper'
import styled from 'styled-components'

export const Div = styled.div`
  text-decoration: none;
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 5px;
  width: 100%;
`

export default class Act extends Component {
  render() {
    const { actEndDate, actName, actStartDate, areaName } = this.props
    return (
      <StyledWrapper>
        <Div>
          <section>{areaName}</section>
          <h2>{actName}</h2>
          <time>
            Sa. {actStartDate} – {actEndDate}
          </time>
        </Div>
      </StyledWrapper>
    )
  }
}
