import styled from 'styled-components'

export default styled.main`
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 2px solid #0e2a3f;
  display: flex;
  align-items: center;
  padding: 20px 15px 21px 20px;
  width: 100%;

  h2 {
    align-self: start;
    color: var(--dark);
    font-family: FestivoLettersNo1;
    font-size: 24px;
    grid-row: 2;
    letter-spacing: 0.02em;
    line-height: 24px;
    margin: 0;
  }

  time {
    align-self: end;
    color: var(--teal);
    font-family: DINWeb-CondBold, sans-serif;
    font-size: 19px;
    grid-row: 1/2;
  }

  section {
    align-items: center;
    color: var(--teal);
    display: flex;
    font-family: DINWeb-CondBold, sans-serif;
    font-size: 17px;
    grid-row: 3;
    height: 10px;
    margin-top: 3px;
  }

  div.star {
    display: inline;
    font-size: 8px;
    margin: 0px 7px 0 7px;
  }
`
