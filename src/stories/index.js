import React from 'react'

import { storiesOf } from '@storybook/react'
import { number, text, boolean } from '@storybook/addon-knobs'

import Fest from '../components/Fest'
import Bookmark from '../components/Bookmark'

storiesOf('Fest', module).add('Festival list item', () => (
  <React.Fragment>
    <Fest
      festId={number('festival id', 12345)}
      festName={text('festival name', 'Festivalname')}
      festStartDate={text('festival start date', '01.12.2018')}
      festEndDate={text('festival end date', '12/01/2018')}
      festCountry={text('country', 'Country')}
      festCity={text('city', 'City')}
    />
  </React.Fragment>
))

storiesOf('Bookmark', module).add('Bookamrk Icon', () => (
  <React.Fragment>
    <Bookmark isBookmarked={boolean('Icon 1: isBookmarked', true)} />
    <Bookmark isBookmarked={boolean('Icon 2: isBookmarked', false)} />
  </React.Fragment>
))
