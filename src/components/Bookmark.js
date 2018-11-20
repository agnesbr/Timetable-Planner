import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />

const Wrapper = styled.div`
  align-items: center;
  background: none;
  border: none;
  color: var(--dark);
  display: flex;
  font-size: 19px;
  grid-column: 2;
  grid-row: 2;
  height: 24px;
  justify-content: center;
  padding: 0;
  width: 24px;
  align-self: center;
  justify-self: center;

  &.bookmark-active {
    color: var(--red);
  }
`

export default class Bookmark extends Component {
  state = {
    isBookmarked: this.props.bookmarked == null ? true : this.props.bookmarked
  }

  handleToggle = () => {
    this.setState({
      isBookmarked: !this.state.isBookmarked
    })
    console.log(this.state.isBookmarked)
  }

  render() {
    const { isBookmarked } = this.state

    return (
      <Wrapper
        className={isBookmarked ? undefined : 'bookmark-active'}
        onClick={this.handleToggle}
      >
        {starIcon}
      </Wrapper>
    )
  }
}
