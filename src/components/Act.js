import React, { Component } from 'react'
// import TimetableLink from './Fest'
// import { Link } from 'react-router-dom'

import StyledWrapper from './StyledWrapper'

// export const TimetableLink = styled(Link)`
//   text-decoration: none;
//   display: grid;
//   grid-auto-rows: auto;
//   grid-gap: 5px;
//   width: 100%;
// `

export default class Act extends Component {
  render() {
    const { actEndDate, actName, actStartDate, actsId, areaName } = this.props
    console.log(actName)
    return (
      <StyledWrapper>
        <section>{areaName}</section>
        <h2>{actName}</h2>
        <time>
          Sa. {actStartDate} – {actEndDate}
        </time>
      </StyledWrapper>
    )
  }
}
