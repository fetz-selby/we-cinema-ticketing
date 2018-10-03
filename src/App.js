import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import MoviePlan from './containers/MovieHome/MoviesPlan';
import Auditorium from './containers/AuditoriumHome/Auditorium';
import Payment from './containers/Payment/Payment';
import Receipt from './containers/Payment/Receipt';

class App extends Component {
  
  render() {
    return (
        <Router>
          <div>
            <Route path='/' exact component={MoviePlan} />
            <Route path='/belegungsplan' exact component={Auditorium} />
            <Route path='/zahlung' exact component={Payment} />
            <Route path='/quittung' exact component={Receipt}/>
          </div>
        </Router>
    );
  }
}

export default App;
