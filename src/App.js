import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import MoviePlan from './containers/MovieHome/MoviesPlan';
import Auditorium from './containers/AuditoriumHome/Auditorium';

class App extends Component {
  
  render() {
    return (
        <Router>
          <div>
            <Route path='/' exact component={MoviePlan} />
            <Route path='/belegungsplan' exact component={Auditorium}/>
          </div>
        </Router>
    );
  }
}

export default App;
