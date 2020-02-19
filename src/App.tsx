import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
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

// default homepage
function Home() {
  return(
    <div>
      <h2>Home</h2>
      <nav>
        <ul>
          <li>
            <Link to="/pets">Pets</Link>
          </li>
          <li>
            <Link to="/breeds">Breeds</Link>
          </li>
          <li>
            <Link to="/shelters">Shelters</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Pets() {
  return(
    <h2>Pets</h2>
  );
}

function Breeds() {
  return(
    <h2>Breeds</h2>
  );
}

function Shelters() {
  return(
    <h2>Shelters</h2>
  );
}

function About() {
  return(
    <h2>About</h2>
  );
}

export default App;
