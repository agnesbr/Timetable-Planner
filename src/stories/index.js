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
  faMapMarkerAlt,
  faCalendar
} from '@fortawesome/free-solid-svg-icons'
import { MemoryRouter } from 'react-router'
import { NavLink } from 'react-router-dom'

import Fest from '../components/Fest'
import Bookmark from '../components/Bookmark'
import NavBarBottomIcon from '../components/NavBarBottomIcon'
import NavBarBottom from '../components/styledComponents/NavBarBottom'
import Act from '../components/Act'
import { StyleWrapper } from './StyleWrapper'
import  StyleBox from './StyleBox'

import { InputWrapper, InputSearchEl, InputImg } from '../components/InputSearch'



const backIcon = <FontAwesomeIcon className="filter-button" icon={faAngleLeft} />
const starIcon = <FontAwesomeIcon className="filter-button" icon={faStar} />
const listIcon = <FontAwesomeIcon className="filter-button" icon={faAlignCenter} />
const sortDown = <FontAwesomeIcon className="filter-button" icon={faSortAlphaDown} />
const clock = <FontAwesomeIcon className="filter-button" icon={faClock} />
const stage = <FontAwesomeIcon className="filter-button" icon={faMapMarkerAlt} />
const sortDownIcon = <FontAwesomeIcon className="filter-button" icon={faSortAlphaDown} />
const calendarIcon = <FontAwesomeIcon className="filter-button" icon={faCalendar} />




function dateKnob(name, defaultValue) {
  const stringTimestamp = date(name, defaultValue)
  return new Date(stringTimestamp)
}

storiesOf('Fest', module)
  .addDecorator(story => <MemoryRouter initialEntries={[ '/timetable' ]}>{story()}</MemoryRouter>)
  .add('Festival list item', () => (
    <React.Fragment>
      <Fest
        festId={number('Festival id', 12345)}
        festName={text('Festival name', 'Festivalname')}
        festStartDate={dateKnob('festStartTime', new Date('2019/10/01'))}
        festEndDate={dateKnob('festEndTime', new Date('2019/10/01'))}
        festCountry={text('Country', 'Country')}
        festCity={text('City', 'City')}
        isBookmarked={boolean('Icon: isBookmarked', false)}
        toggleBookmark={action('onToggle')}
      />
    </React.Fragment>
  ))

  storiesOf('Act', module).add('Act list item', () => (
    <React.Fragment>
      <Act
        areaName={text('Area name', 'Honolulu')}
        actName={text('Acts name', 'Max Mustermann')}
        actStartDate={dateKnob('actStartTime', new Date('2019/10/21 21:00'))}
        actEndDate={dateKnob('actEndTime', new Date('2019/10/21 22:00'))}
        isBookmarked={boolean('Icon: isBookmarked', false)}
        toggleBookmark={action('onToggle')}
      />
    </React.Fragment>
  ))

storiesOf('Bookmark', module).add('Bookmark Icon', () => (
  <StyleWrapper>
    <Bookmark isBookmarked={boolean('Icon 1: isBookmarked', true)} />
    <Bookmark isBookmarked={boolean('Icon 2: isBookmarked', false)} />
  </StyleWrapper>
))


storiesOf('InputSearch', module).add('default', () => (
  <InputWrapper>
    <InputSearchEl placeholder={text('Placeholder text', 'Search for festival name')} onKeyUp={action('onKeyUp')} />
    <InputImg />
  </InputWrapper>
))



storiesOf('NavBarBottom', module)
.add('NavBarBottom Home Screen', () => (
  <StyleBox displ="flex" align="center" justify="space-evenly" w="300px" h="20" bg="rgba(11, 22, 31, 0.85)"> 
<NavBarBottom className="center">
          <NavBarBottomIcon
            dataCy="sortFestsAlpha"
            fontSize="26"
            width="75"
            name="alpha"
            defaultIcon={sortDownIcon}
            activeIcon={sortDownIcon}
            onClick={action('onToggle - handleButtonSortFestsAlpha')}
            iconIsActive={boolean('Icon: sortFestsAlphaIsActive', false)}
          />
          <NavBarBottomIcon
            dataCy="sortFestsDate"
            fontSize="24"
            width="75"
            name="date"
            defaultIcon={calendarIcon}
            activeIcon={calendarIcon}
            onClick={action('onToggle - handleButtonSortDate')}
            iconIsActive={boolean('Icon: sortByDateIsActive', true)}
            
          />
          <NavBarBottomIcon
            dataCy="showBookmarkedFestList"
            fontSize="25"
            width="75"
            defaultIcon={starIcon}
            activeIcon={listIcon}
            onClick={action('onToggle - handleToggleButtonBookmarked')}
            iconIsActive={boolean('Icon: bookmarkIconIsActive', false)}
          />
        </NavBarBottom>
        </StyleBox>
  ))
  .addDecorator(story => <MemoryRouter initialEntries={[ '/' ]}>{story()}</MemoryRouter>)
  .add('NavBarBottom Timetable Screen', () => (
    <StyleBox displ="flex" align="center" justify="space-evenly" w="300px" h="20" bg="rgba(11, 22, 31, 0.85)">
      <NavLink to="/">
        <NavBarBottomIcon
          dataCy={'backToHomepage'}
          fontSize={32}
          defaultIcon={backIcon}
          activeIcon={backIcon}
          iconIsActive={boolean('Icon: backIconIsActive', false)}
        />
      </NavLink>
      <NavBarBottomIcon
        dataCy={'sortActsAlpha'}
        fontSize={26}
        defaultIcon={sortDown}
        activeIcon={sortDown}
        onClick={action('onClick - handleButtonSortAlpha')}
        iconIsActive={boolean('Icon: sortAlphaIconIsActive', false)}
      />
      <NavBarBottomIcon
        dataCy={'sortActsByTime'}
        fontSize={25}
        defaultIcon={clock}
        activeIcon={clock}
        onClick={action('onClick - handleButtonSortTime')}
        iconIsActive={boolean('Icon: sortByTimeIsActive', false)}
      />
      <NavBarBottomIcon
        dataCy={'sortActsByStage'}
        fontSize={25}
        defaultIcon={stage}
        activeIcon={stage}
        onClick={action('onClick - handleButtonSortStage')}
        iconIsActive={boolean('Icon: sortByStageIconIsActive', true)}
      />
      <NavBarBottomIcon
        dataCy={'showBookmarkedFestList'}
        fontSize={25}
        defaultIcon={starIcon}
        activeIcon={listIcon}
        onClick={action('onToggle - handleToggleButtonBookmarked')}
        iconIsActive={boolean('Icon: bookmarkIconIsActive', false)}
      />
    </StyleBox>
    ))
  