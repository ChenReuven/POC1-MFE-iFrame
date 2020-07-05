import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link, HashRouter } from "react-router-dom";



function sendNavConfig() {
  window.parent.postMessage({
    type: 'UPDATE_NAVIGATION', payload: {
      appName: 'mini-app3',
      routes: [{
        routerLink: 'first-page',
        displayName: 'First page (React)'
      },
      {
        routerLink: 'second-page',
        displayName: 'Second page (React)'
      }]
    }
  }, '*');
}
sendNavConfig();
window.addEventListener('message', ({ data: { type } }) => {
  switch (type) {
    case 'RESUME':
      sendNavConfig();
      break;
  }
})


function App() {
  return (
    <Router>
      <HashRouter>
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
      </HashRouter>
    </Router>
  );
}

function FirstPage() {
  React.useEffect(() => {
    window.parent.postMessage(
      {
        type: "UPDATE_SHELL_URL",
        payload: "mini-app3/first-page"
      },
      "*"
    );

  });
  return (
    <div>
      <h2>First Page</h2>
      <Link to="/second-page">Go To Second Page</Link>
    </div>
  );
}

function SecondPage() {
  React.useEffect(() => {
    window.parent.postMessage(
      {
        type: "UPDATE_SHELL_URL",
        payload: "mini-app3/second-page"
      },
      "*"
    );

  });
  return (
    <div>
      <h2>Second Page</h2>
      <Link to="/first-page">Go To First Page</Link>
    </div>
  );
}

export default App;
