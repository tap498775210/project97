/*
  Changed "Sample Questions?" in the sidebar to Posts
*/

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import NavigationBar from "./components/NavigationBar";
import Question from "./components/Question";
//import TBA from "./components/userProfile";   // TODO?

import './App.css';

/*
Reference: https://reactrouter.com/web/example/sidebar
*/

// Information about rotes for router in the sidebar
// Current routes are "/", "/questionAPI", and "/search"
const routes = [
  {
    path: "/",                        // The redirection path when clicking the link in the sidebar
    exact: true,                      // Match the exact path
    sidebar: () => <div>home!</div>,  // It was supposed to display a text when hitting the link, 
                                      // but not working right now. Does not seem to affect Qiazza's function afaik
                                      // So just ignore it right now I guess?
    main: () => <LoginForm />         // What shown on the main section when on that path
  },
  {
    path: "/questionAPI",
    sidebar: () => <div>posts!</div>,
    main: () => <Question />
  },
  {
    path: "/search",
    sidebar: () => <div>search!</div>,
    main: () => <h2>Search</h2>
  },
  // {  // TODO? user profile
  //   path: "/profile",
  //   sidebar: () => <div>user profile</div>,
  //   main: () => <TBA />
  // }
];

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:9000/questionAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentDitMount() {   // Change Will to Did to erase a warning
      this.callAPI();
      console.log(this.state.apiResponse);  // Debug
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          {/* The navigation bar on the top. Currently it is just a decoration */}
          <NavigationBar />

          {/* 
          The sidebar. More styles to be added. Currently the style and codes are mixed 
          together and it seems to be all over the place, might need to seperate them into Sidebar.js and Sidebar.css 
          so App.js looks cleaner
          */}
          <div style={{ display: "flex" }}>
            <div
              style={{
                padding: "10px",
                // width: "40%",
                width: "150px",
                background: "#f0f0f0"
              }}
            >
              {/* Links in the sidebar */}
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {/* <li className="App-intro">
                  {this.state.apiResponse}
                </li> */}
                <li>
                  <Link to="/">Home/Login</Link>
                </li>
                <li>
                  <Link to="/questionAPI">Posts</Link>
                </li>
                <li>
                  <Link to="/search">Search</Link>{" "}
                  {/* Search function not implemented */}
                </li>
                {/* A link to the user profile in the sidebar. 
                <li> 
                  <Link to="/profile"></Link>
                </li> */}
              </ul>

              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    cildren={<route.sidebar />}
                  />
                ))}
              </Switch>
            </div>
            <div style={{ flex: 1, padding: "10px" }}>
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.main />}
                  />
                ))}
              </Switch>
            </div>
          </div>
        </Router>
      </React.Fragment>

      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
    );
  }
}

export default App;