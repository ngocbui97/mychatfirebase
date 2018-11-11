import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Login from './login/login';
import Home from './home/home';

class App extends Component {
  render() {
    return (
      <div >
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/login' component={Login}></Route>
      </div>
    );
  }
}

export default App