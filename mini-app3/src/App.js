import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <h3 className="title">React App</h3>
        <Switch>
          <Route path="/first-page">
            <FirstPage />
          </Route>
          <Route path="/second-page">
            <SecondPage />
          </Route>
          <Route path="/">
            <FirstPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function FirstPage() {
  return (
    <div>
      <h2>First Page</h2>
      <Link to="/second-page">Go To Second Page</Link>
    </div>
  );
}

function SecondPage() {
  return (
    <div>
      <h2>Second Page</h2>
      <Link to="/first-page">Go To First Page</Link>
    </div>
  );
}

export default App;
