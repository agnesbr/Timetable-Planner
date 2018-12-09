import React, { Component } from 'react'
import styled from 'styled-components'

export const FilterWrapper = styled.nav`
	background: rgba(11, 22, 31, 0.85);
	display: flex;
	font-family: DINWeb-CondBold, sans-serif;
	height: 50px;
	width: 100vw;
	position: sticky;
	top: 0;
`
export default class NavBarFilterTimetable extends Component {
	render() {
		const { stageNames, renderStageNames } = this.props
		return <FilterWrapper>{renderStageNames(stageNames)}</FilterWrapper>
	}
}
