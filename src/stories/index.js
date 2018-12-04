import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, boolean, number, date } from '@storybook/addon-knobs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faAlignCenter,
  faAngleLeft,
  faSortAlphaDown,
  faClock,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'
import { MemoryRouter } from 'react-router'
import { NavLink } from 'react-router-dom'

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

const backIcon = (
  <FontAwesomeIcon className="filter-button" icon={faAngleLeft} />
)
const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />
const listIcon = (
  <FontAwesomeIcon className="filter-button" icon={faAlignCenter} />
)
const sortDown = (
  <FontAwesomeIcon className="filter-button" icon={faSortAlphaDown} />
)
const clock = <FontAwesomeIcon className="filter-button" icon={faClock} />
const stage = (
  <FontAwesomeIcon className="filter-button" icon={faMapMarkerAlt} />
)

function dateKnob(name, defaultValue) {
  const stringTimestamp = date(name, defaultValue)
  return new Date(stringTimestamp)
}

storiesOf('Fest', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/timetable']}>{story()}</MemoryRouter>
  ))
  .add('Festival list item', () => (
    <React.Fragment>
      <Fest
        festId={number('Festival id', 12345)}
        festName={text('Festival name', 'Festivalname')}
        festStartDate={dateKnob('festStartTime', new Date('2019.10.01'))}
        festEndDate={dateKnob('festEndTime', new Date('2019.10.01'))}
        festCountry={text('Country', 'Country')}
        festCity={text('City', 'City')}
        isBookmarked={boolean('Icon: isBookmarked', false)}
        toggleBookmark={action('onToggle')}
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
      onClick={action('Bookmark: onClick')}
      iconIsDefault={boolean('Icon 1: isDefault', true)}
    />

    <NavBarBottomIcon
      defaultIcon={starIcon}
      activeIcon={listIcon}
      onClick={action('Bookmark: onClick')}
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
      actStartDate={dateKnob('actStartTime', new Date('21:00 2019-10-21'))}
      actEndDate={dateKnob('actEndTime', new Date('22:00 2019-10-21'))}
      isBookmarked={boolean('Icon: isBookmarked', false)}
      toggleBookmark={action('onToggle')}
    />
  </React.Fragment>
))

storiesOf('NavBarBottom', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('NavBarBottom Timetable Screen', () => (
    <NavBarBottom>
      <NavLink to="/">
        <NavBarBottomIcon
          dataCy={'backToHomepage'}
          fontSize={32}
          defaultIcon={backIcon}
          activeIcon={backIcon}
          iconIsDefault={boolean('Icon: backIconIsDefault', true)}
        />
      </NavLink>
      <NavBarBottomIcon
        dataCy={'sortActsAlpha'}
        fontSize={26}
        defaultIcon={sortDown}
        activeIcon={sortDown}
        onClick={action('onClick - handleButtonSortAlpha')}
        iconIsDefault={boolean('Icon: sortAlphaIconIsDefault', true)}
      />
      <NavBarBottomIcon
        dataCy={'sortActsByTime'}
        fontSize={25}
        defaultIcon={clock}
        activeIcon={clock}
        onClick={action('onClick - handleButtonSortTime')}
        iconIsDefault={boolean('Icon: sortByTimeIsDefault', true)}
      />
      <NavBarBottomIcon
        dataCy={'sortActsByStage'}
        fontSize={25}
        defaultIcon={stage}
        activeIcon={stage}
        onClick={action('onClick - handleButtonSortStage')}
        iconIsDefault={boolean('Icon: sortByStageIconIsDefault', false)}
      />
      <NavBarBottomIcon
        dataCy={'showBookmarkedFestList'}
        fontSize={25}
        defaultIcon={starIcon}
        activeIcon={listIcon}
        onClick={action('onToggle - handleToggleButtonBookmarked')}
        iconIsDefault={boolean('Icon: bookmarkIconIsDefault', true)}
      />
    </NavBarBottom>
  ))
