/*
  Changed "Sample Questions?" in the sidebar to Posts
*/

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Sidebar from "./components/Sidebar";
import routes from "./routes";

import Qna from "./components/qna";

import './App.css';

/*
Reference: https://reactrouter.com/web/example/sidebar
*/

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
} 

class App extends Component {
  // constructor(props) {  // npm said the constructor is useless so it is commented out
  //     super(props);
  //     // this.state = { apiResponse: "" };
  // }

  // // We don't need callAPI right now??
  // callAPI() {    
  //     fetch("http://localhost:9000/questionAPI")
  //         .then(res => res.text())
  //         .then(res => this.setState({ apiResponse: res }));
  // }

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

          {/* Sidebar has been separated into Sidebar.js and Sidebar.css
              Routes have been relocated to routes.js and included in relevant files
          */}

          <div class="site">
            <Sidebar class="sidebar" />
            <div class="main-body">
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.main />}
                    />
                ))}

                  <Route Route path="/q/:id" children={<Qna />} />
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