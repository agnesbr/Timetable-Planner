import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import TimetableScreen from './screens/TimetableScreen'
import festRawData from '../data/ef_data.json'

export default class App extends Component {
  state = {
    festivals: []
  }

  componentWillMount() {
    const festivals = festRawData
    const reformatedFestivals = festivals.map(festival => {
      festival.festStartDate = new Date(festival.festStartDate)
      if (festival.festEndDate === '') {
        festival.festEndDate = null
      } else {
        festival.festEndDate = new Date(festival.festEndDate)
      }
      const newTimeTable = festival.timeTable.map(act => {
        act.actStartDate = new Date(act.actStartDate)
        act.actEndDate = new Date(act.actEndDate)
        return act
      })
      festival.timeTable = newTimeTable
      return festival
    })
    this.setState({
      festivals: reformatedFestivals
    })
  }

  render() {
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
