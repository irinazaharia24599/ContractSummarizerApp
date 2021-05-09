import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import Login from './containers/Login'

class App extends Component {
  render() {
    return (
      <div className="App">

        <Router>
          <div>
            <div>
            <Route path="/" exact component={ Login }/>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
