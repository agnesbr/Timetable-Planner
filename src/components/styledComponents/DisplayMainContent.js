import styled from 'styled-components'

export default styled.main`
  display: block;
  overflow-y: scroll;
  width: ${props => props.width || 100}vw;
  justify-self: center;
`
