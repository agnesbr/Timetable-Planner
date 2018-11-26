import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`
export const InputSearchEl = styled.input`
  border-radius: 10px;
  border: 1px solid #dddddd;
  font-family: FestivoLettersNo1;
  font-size: 0.8em;
  margin: 5px 1px 3px 0px;
  outline: none;
  padding: 10px 50px 8px 9px;
  width: 100%;

  &:focus {
    border: 1px solid var(--yellow);
    box-shadow: inset 0 0px 10px #bbb;
  }
`

export const InputImg = styled.div`
  background-image: url('../../images/search_icon.png');
  background-repeat: no-repeat;
  background-size: contain;
  bottom: 16px;
  height: 16px;
  position: absolute;
  right: 15px;
  width: 16px;
`

export default class InputSearch extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyUp: PropTypes.string
  }

  handleKeyUp = event => {
    const inputValue = event.target.value
    this.props.onChange(inputValue)
  }

  render() {
    return (
      <InputWrapper>
        <InputSearchEl
          data-cy="InputSearch"
          placeholder="Search for festival name"
          type="text"
          onKeyUp={this.handleKeyUp}
        />
        <InputImg />
      </InputWrapper>
    )
  }
}
