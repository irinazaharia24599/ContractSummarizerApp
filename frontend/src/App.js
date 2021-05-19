import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import Login from './containers/Login'
import Home from './containers/Home'

class App extends Component {
  render() {
    return (
      <div className="App">

        <Router>
          <div>
            <div>
            <Route path="/" exact component={ Login }/>
            <Route path="/home" exact component={ Home }/>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
