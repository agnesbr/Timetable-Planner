import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import TimetableScreen from './screens/TimetableScreen'
import festRawData from '../data/ef_data.json'

export default class App extends Component {
  state = {
    festivals: festRawData
  }

  render() {
    console.log('hallo2')
    console.log(this.state.festivals)
    return (
      <Router>
        <React.Fragment>
          <Route
            exact
            path="/"
            render={() => <HomeScreen festivals={this.state.festivals} />}
          />
          <Route
            exact
            path="/timetable/:festId"
            render={({ match }) => (
              <TimetableScreen
                festId={match.params.festId}
                festivals={this.state.festivals}
              />
            )}
          />
        </React.Fragment>
      </Router>
    )
  }
}
