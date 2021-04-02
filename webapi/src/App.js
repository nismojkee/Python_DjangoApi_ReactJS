import React, { Component } from 'react'
import Navigation from './Navigation'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Departments from './Departments/Departments'
import Employees from './Employees/Employees'

export class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact><Departments/></Route>
            <Route path="/employee" exact><Employees/></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
