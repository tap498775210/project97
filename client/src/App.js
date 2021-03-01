import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import NavigationBar from "./components/NavigationBar";
import Question from "./components/Question";

import './App.css';

/*
Reference: https://reactrouter.com/web/example/sidebar
*/

/*
parameters in Question is the followings
props: 
  id: int
  isSovled: bool
  title: string
  content: a bing string??
  user: string
*/
function sampleQuestion() {
  // Generate a sample question
  return (
    <Question
      id={1}
      isSolved={false}
      title={"u-sub?"}
      content={"what's the purpose of u-sub and life in general"}
      user={"a-despriate-student"}
    />
  );
}

// Information about rotes for router in the sidebar
// Current routes are "/", "/samplequestion", and "/search"
const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <LoginForm />
  },
  {
    path: "/question",
    sidebar: () => <div>sample question!</div>,
    main: () => <Question />
  },
  {
    path: "/search",
    sidebar: () => <div>search!</div>,
    main: () => <h2>Search</h2>
  }
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

  componentWillMount() {
      console.log("working?");
      this.callAPI();
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
                  <Link to="/question">Sample Question?</Link>
                </li>
                <li>
                  <Link to="/search">Search</Link>{" "}
                  {/* Search function not implemented */}
                </li>
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