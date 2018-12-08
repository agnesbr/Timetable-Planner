import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />

const Wrapper = styled.div`
	align-items: center;
	align-self: center;
	background: none;
	border: none;
	color: var(--dark);
	display: flex;
	font-size: 19px;
	grid-column: 2;
	grid-row: 2;
	height: 24px;
	justify-content: center;
	justify-self: center;
	padding: 0;
	width: 24px;

	&.bookmark-active {
		color: var(--red);
	}
`

export default class Bookmark extends Component {
	static propTypes = {
		isBookmarked: PropTypes.bool,
		toggleBookmark: PropTypes.func.isRequired
	}

	render() {
		const { id, isBookmarked, toggleBookmark } = this.props

		return (
			<Wrapper
				data-cy="Bookmark"
				className={isBookmarked ? 'bookmark-active' : null}
				onClick={() => toggleBookmark(id)}
			>
				{starIcon}
			</Wrapper>
		)
	}
}
