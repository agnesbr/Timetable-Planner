import React, { Component } from 'react'
import styled from 'styled-components'
import uid from 'uid'

import Fest from '../Fest'
import NavBarBottomIcon from '../NavBarBottomIcon'
import NavBar from '../styledComponents/NavBar'
import NavBarBottom from '../styledComponents/NavBarBottom'
import InputSearch from '../InputSearch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faAlignCenter, faSortAlphaDown, faCalendar } from '@fortawesome/free-solid-svg-icons'

const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />
const listIcon = <FontAwesomeIcon className="filter-button" icon={faAlignCenter} />
const sortDownIcon = <FontAwesomeIcon className="filter-button" icon={faSortAlphaDown} />
const calendarIcon = <FontAwesomeIcon className="filter-button" icon={faCalendar} />

export const Wrapper = styled.section`
	display: grid;
	grid-auto-flow: row;
	grid-template-rows: 120px auto 50px;
	grid-template-columns: 1fr;
	height: 100vh;
	width: 100vw;
	justify-items: center;
`

export const DisplayContent = styled.section`
	display: block;
	overflow-y: scroll;
	width: 96vw;
`

export const StyledCounter = styled.h1`
	& > span {
		color: var(--orange);
	}
`

export default class HomeScreen extends Component {
	state = {
		listOfBookmarkedFests: this.loadFavoriteFests(),
		search: '',
		bookmarkIconIsActive: false,
		sortAlphaIconIsActive: false,
		sortByDateIsActive: true
	}

	isFestBookmarked(festId) {
		const { listOfBookmarkedFests } = this.state
		return listOfBookmarkedFests.includes(festId)
	}

	toggleBookmark = festId => {
		const { listOfBookmarkedFests } = this.state

		const newListOfBookmarkedFests = listOfBookmarkedFests.includes(festId)
			? this.deleteItemFromListOfBookmarkedFests(festId)
			: this.addItemToListOfBookmarkedFests(festId)

		this.setState({
			listOfBookmarkedFests: newListOfBookmarkedFests
		})
	}

	deleteItemFromListOfBookmarkedFests = festId => {
		const { listOfBookmarkedFests } = this.state
		const bookmarkedIndex = listOfBookmarkedFests.indexOf(festId)
		const newListOfBookmarkedFests = [
			...listOfBookmarkedFests.slice(0, bookmarkedIndex),
			...listOfBookmarkedFests.slice(bookmarkedIndex + 1)
		]

		return newListOfBookmarkedFests
	}

	addItemToListOfBookmarkedFests = festId => {
		const { listOfBookmarkedFests } = this.state
		const newListOfBookmarkedFests = listOfBookmarkedFests.includes(festId)
			? [ ...listOfBookmarkedFests ]
			: [ ...listOfBookmarkedFests, festId ]

		return newListOfBookmarkedFests
	}

	getSelectedFestList = () => {
		const { bookmarkIconIsActive, sortAlphaIconIsActive, sortByDateIsActive } = this.state
		const { festivals } = this.props
		const filteredFestivals = festivals
			.filter(festival => festival.festName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
			.filter(festival => !bookmarkIconIsActive || this.isFestBookmarked(festival.festId))
		if (sortAlphaIconIsActive) {
			return filteredFestivals.sort((a, b) => a.festName.localeCompare(b.festName))
		} else if (sortByDateIsActive) {
			return filteredFestivals.sort((a, b) => a.festStartDate - b.festStartDate)
		}
	}

	getSelectedListLength = () => {
		return this.getSelectedFestList().length
	}

	createFestList() {
		return this.getSelectedFestList().map(this.renderSingleFest)
	}

	updateSearch = inputValue => {
		this.setState({
			search: inputValue
		})
	}

	renderSingleFest = festival => {
		const { festId, festName, festStartDate, festEndDate, festCountry, festCity, ...rest } = festival

		return (
			<Fest
				key={uid()}
				festId={festId}
				festName={festName}
				festStartDate={festStartDate}
				festEndDate={festEndDate}
				festCountry={festCountry}
				festCity={festCity}
				isBookmarked={this.isFestBookmarked(festId)}
				toggleBookmark={this.toggleBookmark}
				rest={rest}
			/>
		)
	}

	handleToggleButtonBookmarked = () => {
		this.setState({
			bookmarkIconIsActive: !this.state.bookmarkIconIsActive
		})
	}

	render() {
		this.saveFavoriteFests()

		return (
			<Wrapper>
				<NavBar height="120">
					<StyledCounter>
						list of available festivals <span>{this.getSelectedListLength()}</span>
					</StyledCounter>
					<InputSearch placeholder="Search for festival name" onChange={this.updateSearch} />
				</NavBar>
				<DisplayContent data-cy="FestList">{this.createFestList()}</DisplayContent>
				<NavBarBottom className="center">
					<NavBarBottomIcon
						dataCy="sortFestsAlpha"
						fontSize="26"
						width="75"
						defaultIcon={sortDownIcon}
						activeIcon={sortDownIcon}
						onClick={() => this.handleButtonSortAlpha()}
						iconIsActive={this.state.sortAlphaIconIsActive}
					/>
					<NavBarBottomIcon
						dataCy="sortFestsDate"
						fontSize="24"
						width="75"
						defaultIcon={calendarIcon}
						activeIcon={calendarIcon}
						onClick={() => this.handleButtonSortDate()}
						iconIsActive={this.state.sortByDateIsActive}
					/>
					<NavBarBottomIcon
						dataCy="showBookmarkedFestList"
						fontSize="25"
						width="75"
						defaultIcon={starIcon}
						activeIcon={listIcon}
						onClick={() => this.handleToggleButtonBookmarked()}
						iconIsActive={this.state.bookmarkIconIsActive}
					/>
				</NavBarBottom>
			</Wrapper>
		)
	}

	handleButtonSortAlpha = () => {
		this.setState({
			sortAlphaIconIsActive: true,
			sortByDateIsActive: false
		})
	}
	handleButtonSortDate = () => {
		this.setState({
			sortAlphaIconIsActive: false,
			sortByDateIsActive: true
		})
	}

	saveFavoriteFests() {
		localStorage.setItem('TimeTable--listOfBookmarkedFests', JSON.stringify(this.state.listOfBookmarkedFests))
	}

	loadFavoriteFests() {
		try {
			return JSON.parse(localStorage.getItem('TimeTable--listOfBookmarkedFests')) || []
		} catch (err) {
			return []
		}
	}
}
