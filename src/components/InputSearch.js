import React, { Component } from 'react'
import styled from 'styled-components'

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const InputSearchEl = styled.input`
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  outline: none;
  margin: 5px 1px 3px 0px;
  border: 1px solid #dddddd;
  font-size: 0.8em;
  border-radius: 10px;
  width: 100%;
  font-family: FestivoLettersNo1;
  outline: none;
  padding: 10px 40px 8px 10px;

  input:focus {
    padding: 3px 3px 3px 3px;
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    border: 10px solid rgba(81, 203, 238, 1);
  }
`

export const InputImg = styled.div`
  position: absolute;
  background-color: yellow;
  bottom: 7px;
  right: 7px;
  width: 24px;
  height: 24px;
  z-index: 1;
  background-image: url('../../images/search-icon.png');
`

export default class InputSearch extends Component {
  // handleKeyUp = event => {
  //   const input = event.target
  //   if (event.key === 'Enter') {
  //     this.props.onEnter(input.value)
  //     input.focus()
  //   }
  // }

  handleKeyUp = event => {
    const input = event.target
    if (event.key === 'Enter') {
      this.props.onEnter(input.value)
      input.focus()
    }
  }

  render() {
    const { onEnter } = this.props
    return (
      <InputWrapper>
        <InputSearchEl
          data-cy="InputSearch"
          onKeyUp={this.handleKeyUp}
          placeholder="Search"
          type="text"
        />
        <InputImg />
      </InputWrapper>
    )
  }
}
