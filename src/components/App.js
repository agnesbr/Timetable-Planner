import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import TimetableScreen from './screens/TimetableScreen'
import festRawData from '../data/ef_data.json'
import reformatData from '../data/reformatData'

export default class App extends Component {
  state = {
    festivals: reformatData(festRawData),
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" render={() => <HomeScreen festivals={this.state.festivals} />} />
          <Route
            exact
            path="/timetable/:festId"
            render={({ match }) => <TimetableScreen festId={match.params.festId} festivals={this.state.festivals} />}
          />
        </React.Fragment>
      </Router>
    )
  }
}
