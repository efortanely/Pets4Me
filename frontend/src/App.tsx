import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home/Home'
import About from './About/About'
import Pets from './model-homepages/Pets/Pets'
import Breeds from './model-homepages/Breeds/Breeds'
import Shelters from './model-homepages/Shelters/Shelters'
import Navbar from './Components/Navbar'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
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
