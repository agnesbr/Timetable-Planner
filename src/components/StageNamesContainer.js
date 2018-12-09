import React, { Component } from 'react'
import styled from 'styled-components'

export const WrapperStagenames = styled.nav`
	background: rgba(11, 22, 31, 0.85);
	display: flex;
	font-family: DINWeb-CondBold, sans-serif;
	height: ${props => props.height || 50}px;
	width: 100vw;
	position: sticky;
	top: 0;
`

export default class StageNamesContainer extends Component {
	render() {
		const { stageNames, renderStageNames } = this.props
		return <WrapperStagenames height="40">{renderStageNames(stageNames)}</WrapperStagenames>
	}
}
