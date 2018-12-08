import React, { Component } from 'react'
import StyledWrapper from './styledComponents/StyledWrapper'
import InfoLine from './styledComponents/InfoLine'
import DateTimeLine from './styledComponents/DateTimeLine'
import styled from 'styled-components'
import Bookmark from './Bookmark'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const clockIcon = <FontAwesomeIcon className="filter-button" icon={faClock} />
const stageIcon = <FontAwesomeIcon className="filter-button" icon={faMapMarkerAlt} />
export const Div = styled.div`
	text-decoration: none;
	display: grid;
	grid-auto-rows: auto;
	grid-gap: 5px;
	width: 100%;
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
		actEndDate: PropTypes.instanceOf(Date)
	}

	render() {
		const { actsId, areaName, actName, actStartDate, actEndDate, isBookmarked, toggleBookmark } = this.props

		const playDay = actStartDate.toLocaleDateString('en-GB', {
			weekday: 'short'
		})

		const actStartTime = actStartDate.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit'
		})

		const actEndTime = actEndDate.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit'
		})

		return (
			<StyledWrapper>
				<Div>
					<InfoLine className="purple" mT="9" mB="6">
						{areaName}
					</InfoLine>
					<h2> {actName}</h2>
					<DateTimeLine className="purple" mT="3" mB="4">
						{playDay}, {actStartTime} – {actEndTime}
					</DateTimeLine>
				</Div>
				<Bookmark id={actsId} isBookmarked={isBookmarked} toggleBookmark={toggleBookmark} />
			</StyledWrapper>
		)
	}
}
