import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Bookmark from './Bookmark'
import Act from './Act'
import PropTypes from 'prop-types'
import uid from 'uid'
const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />

export const TimetableLink = styled(Link)`
  text-decoration: none;
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 5px;
  width: 100%;
`

export default class FestivalPage extends Component {
  createActList() {
    const { festData } = this.props
    return festData.timeTable.map(this.renderSingleAct)
  }

  renderSingleAct = act => {
    const { actEndDate, actName, actStartDate, actsId, areaName } = act
    return (
      <Act
        key={uid()}
        actEndDate={actEndDate}
        actName={actName}
        actStartDate={actStartDate}
        actsId={actsId}
        areaName={areaName}
      />
    )
  }
  render() {
    const { festData } = this.props
    const timetableArr = festData.timeTable
    console.log(timetableArr)

    return (
      <React.Fragment>
        <TimetableLink to={`/timetable/${festData.festId}`} />
        {this.createActList()}
        <Bookmark />
      </React.Fragment>
    )
  }
}

// export default class FestivalPage extends Component {
//   render() {
//     const { data } = this.props
//     return <Wrapper>{data.festName}</Wrapper>
//   }
// }

// <Act
//   key={uid()}
//   actEndDate={timetableArr[0].actEndDate}
//   actName={timetableArr[0].actName}
//   actStartDate={timetableArr[0].actStartDate}
//   actsId={timetableArr[0].actsId}
//   areaName={timetableArr[0].areaName}
// />
