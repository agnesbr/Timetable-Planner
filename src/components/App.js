import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import TimetableScreen from './screens/TimetableScreen'
import festRawData from '../data/ef_data.json'

export default class App extends Component {
  state = {
    festivals: festRawData
  }

  getFestDateObj() {
    const festDateObj = this.state.festivals
    festDateObj.map((festival, index) => {
      festDateObj[index].festStartDate = new Date(festival.festStartDate)
      festDateObj[index].festEndDate = new Date(festival.festEndDate)
    })
  }

  // getActDateObj() {
  //   const actDateObj = this.state.festivals.timeTable
  //   console.log(actDateObj)
  //   // actDateObj.map((festival, index) => {
  //   //   actDateObj[index].actStartDate = new Date(festival.timeTable.actStartDate)
  //     //  actDateObj[index].actsEndDate = new Date(festival.festEndDate)
  //   })
  // }

  render() {
    this.getFestDateObj()
    //this.getActDateObj()
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
