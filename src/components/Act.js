import React, { Component } from 'react'
import StyledWrapper from './styledComponents/StyledWrapper'
import InfoLine from './styledComponents/InfoLine'
import DateTimeLine from './styledComponents/DateTimeLine'
import styled from 'styled-components'
import Bookmark from './Bookmark'
import Warning from './Warning'
import PropTypes from 'prop-types'

export const ActsContainer = styled.div`
  text-decoration: none;
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 5px;
  width: 100%;
`

export const IconContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
`

export const StyledIcon = styled.span`
  font-size: ${props => props.fontSize}px;
  margin-right: ${props => props.mRight}px;
  height: ${props => props.height}px;
`

export default class Act extends Component {
  static propTypes = {
    areaName: PropTypes.string.isRequired,
    actName: PropTypes.string.isRequired,
    actStartDate: PropTypes.instanceOf(Date),
    actEndDate: PropTypes.instanceOf(Date),
  }

  render() {
    const {
      actsId,
      areaName,
      actName,
      actStartDate,
      actEndDate,
      isBookmarked,
      toggleBookmark,
      isTimeOverlapping,
    } = this.props

    const playDay = actStartDate.toLocaleDateString('en-GB', {
      weekday: 'short',
    })

    const actStartTime = actStartDate.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })

    const actEndTime = actEndDate.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })

    return (
      <StyledWrapper>
        <ActsContainer>
          <InfoLine className="purple" mt="3" mb="2">
            {areaName}
          </InfoLine>
          <h2> {actName}</h2>
          <DateTimeLine className="purple" mt="1" mb="1">
            {playDay}, {actStartTime} – {actEndTime}
          </DateTimeLine>
        </ActsContainer>
        <IconContainer>
          <Bookmark id={actsId} isBookmarked={isBookmarked} toggleBookmark={toggleBookmark} />
          <Warning id={actsId} isTimeOverlapping={isTimeOverlapping} />
        </IconContainer>
      </StyledWrapper>
    )
  }
}
