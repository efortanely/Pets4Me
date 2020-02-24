import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home/Home'
import About from './About/About'
import Pets from './Pets/Pets'
import Breeds from './Breeds/Breeds'
import Shelters from './Shelters/Shelters'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/pets">
            <Pets />
          </Route>
          <Route path="/breeds">
            <Breeds />
          </Route>
          <Route path="/shelters">
            <Shelters />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
