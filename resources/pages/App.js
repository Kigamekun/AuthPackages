import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import CreatePoll from './pages/CreatePoll';

class App extends Component {
  render() {
    return (
      <Router>
      <Routes>
          <Route exact path='/'  element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/create-poll' element={<CreatePoll/>} />
      </Routes>
      </Router>
    );
  }
}

export default App;
