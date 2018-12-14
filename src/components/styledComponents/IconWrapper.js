import styled from 'styled-components'
export default styled.div`
  align-items: center;
  align-self: center;
  background: none;
  border: none;
  /* color: rgba(161, 119, 192, 1); */
  color: rgba(11, 22, 31, 0);
  display: flex;
  font-size: 19px;
  grid-column: 2;
  grid-row: 2;
  height: 24px;
  justify-content: center;
  justify-self: center;
  padding: 0;
  width: 24px;

  &:first-Child {
    margin-bottom: 23px;
    color: var(--dark);
  }

  &.bookmark-active,
  &.warning-active {
    color: var(--red);
  }
`
