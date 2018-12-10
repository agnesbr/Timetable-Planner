import styled from 'styled-components'

export default styled.section`
	align-items: center;
	display: flex;
	font-family: "DINWeb-CondBold", sans-serif;
	font-size: 17px;
	height: 10px;
	letter-spacing: 0.02em;
	margin-top: ${props => props.mT || 3}px;
	margin-bottom: ${props => props.mB || 3}px;
`
