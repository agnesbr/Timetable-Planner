import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, boolean, number, date } from '@storybook/addon-knobs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faAlignCenter } from '@fortawesome/free-solid-svg-icons'

import Fest from '../components/Fest'
import Bookmark from '../components/Bookmark'
import NavBarBottomIcon from '../components/NavBarBottomIcon'
import NavBarBottom from '../components/NavBarBottom'
import Act from '../components/Act'

import { StyleWrapper } from './StyleWrapper'
import {
  InputWrapper,
  InputSearchEl,
  InputImg
} from '../components/InputSearch'

const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />
const listIcon = (
  <FontAwesomeIcon className="filter-button" icon={faAlignCenter} />
)

storiesOf('Fest', module).add('Festival list item', () => (
  <React.Fragment>
    <Fest
      festId={number('Festival id', 12345)}
      festName={text('Festival name', 'Festivalname')}
      // festStartDate={text('Festival start date', '01.12.2018')}
      // festEndDate={text('Festival end date', '12/01/2018')}
      festCountry={text('Country', 'Country')}
      festCity={text('City', 'City')}
      isBookmarked={boolean('Icon: isBookmarked', false)}
      //toggleBookmark={action('onToggle')}
    />
  </React.Fragment>
))

storiesOf('Bookmark', module).add('Bookamrk Icon', () => (
  <StyleWrapper>
    <Bookmark isBookmarked={boolean('Icon 1: isBookmarked', true)} />
    <Bookmark isBookmarked={boolean('Icon 2: isBookmarked', false)} />
  </StyleWrapper>
))

storiesOf('NavBarBottomIcon', module).add('Icon', () => (
  <NavBarBottom>
    <NavBarBottomIcon
      defaultIcon={starIcon}
      activeIcon={listIcon}
      // onClick={action('onClick')}
      iconIsDefault={boolean('Icon 1: isDefault', true)}
    />
    <NavBarBottomIcon
      defaultIcon={starIcon}
      activeIcon={listIcon}
      // onClick={action('onClick')}
      iconIsDefault={boolean('Icon 2: isDefault', false)}
    />
  </NavBarBottom>
))

storiesOf('InputSearch', module).add('default', () => (
  <InputWrapper>
    <InputSearchEl
      placeholder={text('Placeholder text', 'Search for festival name')}
      onKeyUp={action('onKeyUp')}
    />
    <InputImg />
  </InputWrapper>
))

storiesOf('Act', module).add('Act list item', () => (
  <React.Fragment>
    <Act
      areaName={text('Area name', 'Honolulu')}
      actName={text('Acts name', 'Max Mustermann')}
      //actStartDate={date('actStartTime', new Date('2019.10.01'))}
      //actEndDate={date('actEndTime', new Date('2019.10.01'))}
      actStartTime={text('actStartTime', '2019.10.01')}
      // actEndTime={date('actEndDate', new Date('2019.10.03'))}
    />
  </React.Fragment>
))
