import React, { Component } from 'react'
import StyledWrapper from './StyledWrapper'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Div = styled.div`
  text-decoration: none;
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 5px;
  width: 100%;
`

export default class Act extends Component {
  static propTypes = {
    areaName: PropTypes.string.isRequired,
    actName: PropTypes.string.isRequired,
    actStartDate: PropTypes.string.isRequired,
    actEndDate: PropTypes.string.isRequired
  }

  render() {
    const { areaName, actName, actStartDate, actEndDate } = this.props
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
