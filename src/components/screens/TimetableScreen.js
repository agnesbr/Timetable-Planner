import React, { Component } from 'react'
import uid from 'uid'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import Act from '../Act'
import StageName from '../StageName'
import InputSearch from '../InputSearch'
import NavBarBottomIcon from '../NavBarBottomIcon'
import NavBarFilterTimetable from '../NavBarFilterTimetable'

import styled from 'styled-components'
import NavBar from '../styledComponents/NavBar'
import WrapperApp from '../styledComponents/WrapperApp'
import NavBarBottom from '../styledComponents/NavBarBottom'
import DisplayMainContent from '../styledComponents/DisplayMainContent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faStar,
	faAlignCenter,
	faAngleLeft,
	faSortAlphaDown,
	faClock,
	faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'

const backIcon = <FontAwesomeIcon className="filter-button" icon={faAngleLeft} />
const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />
const listIcon = <FontAwesomeIcon className="filter-button" icon={faAlignCenter} />
const sortDownIcon = <FontAwesomeIcon className="filter-button" icon={faSortAlphaDown} />
const clockIcon = <FontAwesomeIcon className="filter-button" icon={faClock} />
const stageIcon = <FontAwesomeIcon className="filter-button" icon={faMapMarkerAlt} />

export const ContentInner = styled.section`
	display: block;
	flex-direction: column;

	header {
		display: flex;
		background: rgba(11, 22, 31, 0.85);
		position: sticky;
	}

	main {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
`

export const InnerColumn = styled.section`
	min-width: 250px;
	margin: 0 3px;
	flex-grow: 1;

	:first-child {
		margin-left: 7px;
	}

	:last-child {
		margin-right: 7px;
	}
`

export const Homelink = styled(Link)`
  display: block;
`

export default class TimetableScreen extends Component {
	state = {
		bookmarkIconIsActive: false,
		backIconIsActive: false,
		sortAlphaIconIsActive: false,
		sortByTimeIsActive: false,
		sortByStageIconIsActive: true,
		listOfBookmarkedActs: this.loadFavoriteActs(),
		search: ''
	}

	updateSearch = inputValue => {
		this.setState({
			search: inputValue
		})
	}

	toggleBookmark = actsId => {
		const { listOfBookmarkedActs } = this.state
		const newListOfBookmarkedActs = listOfBookmarkedActs.includes(actsId)
			? this.deleteItemFromActIsBookmarked(actsId)
			: this.addItemToListOfBookmarkedActs(actsId)

		this.setState({
			listOfBookmarkedActs: newListOfBookmarkedActs
		})
	}

	deleteItemFromActIsBookmarked = actsId => {
		const { listOfBookmarkedActs } = this.state
		const bookmarkedIndex = listOfBookmarkedActs.indexOf(actsId)
		const newListOfBookmarkedActs = [
			...listOfBookmarkedActs.slice(0, bookmarkedIndex),
			...listOfBookmarkedActs.slice(bookmarkedIndex + 1)
		]

		return newListOfBookmarkedActs
	}

	addItemToListOfBookmarkedActs = actsId => {
		const { listOfBookmarkedActs } = this.state
		const newListOfBookmarkedActs = listOfBookmarkedActs.includes(actsId)
			? [ ...listOfBookmarkedActs ]
			: [ ...listOfBookmarkedActs, actsId ]

		return newListOfBookmarkedActs
	}

	isActBookmarked(actsId) {
		const { listOfBookmarkedActs } = this.state
		return listOfBookmarkedActs.includes(actsId)
	}

	getSelectedActList = timeTable => {
		const { bookmarkIconIsActive, sortAlphaIconIsActive, sortByTimeIsActive, sortByStageIconIsActive } = this.state

		const filteredTimeTable = timeTable
			.filter(act => act.actName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
			.filter(act => !bookmarkIconIsActive || this.isActBookmarked(act.actsId))

		if (sortAlphaIconIsActive) {
			return filteredTimeTable.sort((a, b) => a.actName.localeCompare(b.actName))
		} else if (sortByTimeIsActive) {
			return filteredTimeTable.sort((a, b) => a.actStartDate - b.actStartDate)
		} else if (sortByStageIconIsActive) {
			return filteredTimeTable.sort((a, b) => a.areaName.localeCompare(b.areaName))
		}
	}

	createActList(festObject) {
		return this.getSelectedActList(festObject.timeTable).map(this.renderSingleAct)
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
				isBookmarked={this.isActBookmarked(actsId)}
				toggleBookmark={this.toggleBookmark}
			/>
		)
	}

	getFestById = (festivals, festId) => {
		return festivals.find(festival => festival.festId.toString() === festId)
	}

	shortenFestName = (headline, num) => {
		if (headline.length > num) {
			return headline.slice(0, num - 3) + '...'
		} else {
			return headline
		}
	}

	getUniqueStages = festObject => {
		const timeTable = festObject.timeTable
		const allStages = timeTable.map(act => act.areaName)
		const uniqueStages = [ ...new Set(allStages) ]

		return uniqueStages
	}

	renderStageNames = stageNames => {
		return stageNames.map(stageName => {
			console.log(stageName)
			return <StageName stageName={stageName} />
		})
	}

	divideTimetableIntoStages = festObject => {
		const timeTable = festObject.timeTable
		const allStages = timeTable.map(act => act.areaName)
		const uniqueStages = [ ...new Set(allStages) ]

		const stageObject = uniqueStages.map(stage => {
			return timeTable.filter(act => act.areaName === stage)
		})
		return stageObject.map(stage => {
			return <InnerColumn>{this.getSelectedActList(stage).map(act => this.renderSingleAct(act))}</InnerColumn>
		})
	}

	render() {
		this.saveFavoriteActs()
		const { festivals, festId } = this.props
		const festObject = this.getFestById(festivals, festId)
		const headline = festObject.festName
		const stageNames = this.getUniqueStages(festObject)

		return (
			<WrapperApp>
				<NavBar height="200">
					{<h1> {this.shortenFestName(headline, 35)}</h1>}
					<InputSearch placeholder="Search for act name" onChange={this.updateSearch} />
				</NavBar>
				<React.Fragment>
					{this.state.sortByStageIconIsActive ? (
						<DisplayMainContent data-cy="ActsList" width="100">
							<NavBarFilterTimetable stageNames={stageNames} renderStageNames={this.renderStageNames} />
							<ContentInner>
								{
									<main>
										{this.state.sortByStageIconIsActive}
										{this.divideTimetableIntoStages(festObject)}
									</main>
								}
							</ContentInner>
						</DisplayMainContent>
					) : (
						<DisplayMainContent data-cy="ActsList" width="96">
							{this.createActList(festObject)}
						</DisplayMainContent>
					)}
				</React.Fragment>
				<NavBarBottom className="space-between">
					<NavLink to="/">
						<NavBarBottomIcon
							dataCy="backToHomepage"
							fontSize="32"
							width="40"
							defaultIcon={backIcon}
							activeIcon={backIcon}
							iconIsActive={this.state.backIconIsActive}
						/>
					</NavLink>
					<NavBarBottomIcon
						dataCy="sortActsAlpha"
						fontSize="26"
						width="40"
						defaultIcon={sortDownIcon}
						activeIcon={sortDownIcon}
						onClick={() => this.handleButtonSortAlpha()}
						iconIsActive={this.state.sortAlphaIconIsActive}
					/>
					<NavBarBottomIcon
						dataCy="sortActsByTime"
						fontSize="25"
						width="40"
						defaultIcon={clockIcon}
						activeIcon={clockIcon}
						onClick={() => this.handleButtonSortTime()}
						iconIsActive={this.state.sortByTimeIsActive}
					/>
					<NavBarBottomIcon
						dataCy="sortActsByStageIcon"
						fontSize="25"
						width="40"
						defaultIcon={stageIcon}
						activeIcon={stageIcon}
						onClick={() => this.handleButtonSortStage()}
						iconIsActive={this.state.sortByStageIconIsActive}
					/>
					<NavBarBottomIcon
						dataCy="showBookmarkedActsList"
						fontSize="25"
						width="40"
						defaultIcon={starIcon}
						activeIcon={listIcon}
						onClick={() => this.handleToggleButtonBookmarked()}
						iconIsActive={this.state.bookmarkIconIsActive}
					/>
				</NavBarBottom>
			</WrapperApp>
		)
	}
	handleToggleButtonBookmarked = () => {
		this.setState({
			bookmarkIconIsActive: !this.state.bookmarkIconIsActive
		})
	}
	handleButtonSortAlpha = () => {
		this.setState({
			sortAlphaIconIsActive: true,
			sortByTimeIsActive: false,
			sortByStageIconIsActive: false
		})
	}
	handleButtonSortTime = () => {
		this.setState({
			sortAlphaIconIsActive: false,
			sortByTimeIsActive: true,
			sortByStageIconIsActive: false
		})
	}
	handleButtonSortStage = () => {
		this.setState({
			sortAlphaIconIsActive: false,
			sortByTimeIsActive: false,
			sortByStageIconIsActive: true
		})
	}

	saveFavoriteActs() {
		localStorage.setItem('TimeTable--listOfBookmarkedActs', JSON.stringify(this.state.listOfBookmarkedActs))
	}

	loadFavoriteActs() {
		try {
			return JSON.parse(localStorage.getItem('TimeTable--listOfBookmarkedActs')) || []
		} catch (err) {
			return []
		}
	}
}
