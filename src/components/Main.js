import React from 'react';
import Home from './Home';
import Report from './Report';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import '../styles/Main.css';

function Main() {
  return (
    <div className="main">
      <h2 className="main-header">Excel Report Viewer</h2>
      <BrowserRouter>
        <div className="main-content">
          <Switch>
            <Route path="/report">
              <Report />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Main;