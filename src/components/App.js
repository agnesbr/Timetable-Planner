import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import TimetableScreen from './screens/TimetableScreen'
import festData from '../data/ef_data.json'
export default class App extends Component {
  state = {
    festivals: festData
  }

  getFestById = festId => {
    return this.state.festivals.find(fest => fest.festId.toString() === festId)
  }

  render() {
    console.log('hallo2')
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={HomeScreen} />

          <Route exact path="/timetable/:festId" component={TimetableScreen} />
        </React.Fragment>
      </Router>
    )
  }
}
