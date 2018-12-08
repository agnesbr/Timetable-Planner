import React, { Component } from 'react'
import styled from 'styled-components'

export const StyledHeadline = styled.h3`
	align-items: center;
	color: var(--light);
	background: var(--purple);
	display: flex;
	font-family: DINWeb-CondBold, sans-serif;
	letter-spacing: 0.01em;
	margin: 0 7px;
	min-width: 250px;
	max-width: 100%;
	font-size: 1.5em;
	padding: 5px 20px 0 20px;
	justify-content: center;

	:first-child {
		margin-left: 14px;
	}

	:last-child {
		margin-right: 14px;
	}
`

export default class StageName extends Component {
	render() {
		const { stageName } = this.props
		return <StyledHeadline>{stageName}</StyledHeadline>
	}
}
