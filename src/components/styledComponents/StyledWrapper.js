import styled from 'styled-components'

export default styled.section`
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 2px solid #0e2a3f;
  display: flex;
  align-items: center;
  padding: 20px 15px 21px 20px;

  h2 {
    align-self: start;
    color: var(--dark);
    font-family: FestivoLettersNo1;
    font-size: ${props => props.fontSize || 25}px;
    letter-spacing: 0.01em;
    line-height: 26px;
    margin: 0;
  }

  .teal {
    color: var(--teal);
  }

  .purple {
    color: var(--purple);
  }

  div.star {
    display: inline;
    font-size: 8px;
    margin: 0px 7px 0 7px;
  }
`
