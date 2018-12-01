import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import TimetableScreen from './screens/TimetableScreen'
import festRawData from '../data/ef_data.json'

export default class App extends Component {
  state = {
    festivals: festRawData
  }

  reformatData() {
    const reformatedFestivals = this.state.festivals
    reformatedFestivals.map((festival, festIndex) => {
      reformatedFestivals[festIndex].festStartDate = new Date(
        festival.festStartDate
      )

      reformatedFestivals[festIndex].festEndDate = new Date(
        festival.festEndDate
      )

      festival.timeTable.map((act, actIndex) => {
        reformatedFestivals[festIndex].timeTable[
          actIndex
        ].actStartDate = new Date(act.actStartDate)
        reformatedFestivals[festIndex].timeTable[
          actIndex
        ].actEndDate = new Date(act.actEndDate)
      })
    })
  }

  render() {
    this.reformatData()

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
