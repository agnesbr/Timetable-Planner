import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, boolean } from '@storybook/addon-knobs'

import Todo from '../components/Todo'

import StyleBox from './StyleBox'

storiesOf('Todo', module).add('default', () => (
  <React.Fragment>
    <Todo
      text={text('Todo 1: text', 'Hello world')}
      done={boolean('Todo 1: done', false)}
      onToggle={action('Todo 1: onToggle')}
      onDelete={action('Todo 1: onDelete')}
    />
    <StyleBox h={40} />
    <Todo
      text={text('Todo 2: text', 'Lorem ipsum dolor sit')}
      done={boolean('Todo 2: done', false)}
      onToggle={action('Todo 2: onToggle')}
      onDelete={action('Todo 2: onDelete')}
    />
  </React.Fragment>
))
