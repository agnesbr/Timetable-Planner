import React from 'react'

import { storiesOf } from '@storybook/react'
import { number, text, boolean } from '@storybook/addon-knobs'

import FestCard from '../components/FestCard'

import StyleBox from './StyleBox'

storiesOf('FestCard', module).add('default', () => (
  <React.Fragment>
    <FestCard
      festId={number('festival id', 12345)}
      festName={text('festival name', 'Festivalname')}
      festStartDate={text('festival start date', '01.12.2018')}
      festEndDate={text('festival end date', '12/01/2018')}
      festCountry={text('country', 'Country')}
      festCity={text('city', 'City')}
    />
  </React.Fragment>
))
