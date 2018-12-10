import styled from 'styled-components'

export default styled.time`
  align-self: end;
  font-family: "DINWeb-CondBold", sans-serif;
  font-size: 19px;
  display: flex;
  align-items: center;
  margin-top: ${props => props.mT || 3}px;
  margin-bottom: ${props => props.mB || 3}px;
`
