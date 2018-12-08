import styled from 'styled-components'

export default styled.nav`
  background: rgba(11, 22, 31, 0.85);
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 1.5em;
  padding: 0 20px;

  &.space-between {
    justify-content: space-between;
  }

  &.center {
    justify-content: center;
  }
`
