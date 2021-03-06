/*
  Changed "Sample Questions?" in the sidebar to Posts
*/

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MenuIcon from '@material-ui/icons/Menu';
import routes from "./routes";

import Qna from "./components/qna";

import './App.css';

class App extends Component {
  constructor() {  // setup for debug and 
      super();
      this.state = { 
        apiResponse: "",
        showHideSidebar: false
      };
      this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent() {   // used to toggle sidebar
    console.log(this.state.showHideSidebar)
    this.setState({ showHideSidebar: !this.state.showHideSidebar });
  }

  componentDitMount() {   // Change Will to Did to erase a warning
    this.callAPI();
    console.log(this.state.apiResponse);  // Debug
  }

  render() {
    const { showHideSidebar } = this.state;
    return (
      <React.Fragment>
        <Router>
          {/* Navigation Bar has been replaced with the following elements. */}
          <div className="site">
            <button className="sidebarToggle" onClick={() => this.hideComponent()}> 
              <MenuIcon fontSize="large" style={{ color: "white"}} />
            </button>
            <div className="navBar">Qiazza</div>
          </div>
          
          {/* Sidebar has been separated into Sidebar.js and Sidebar.css
              Routes have been relocated to routes.js and included in relevant files
          */}

          <div className="site">
            {showHideSidebar && <Sidebar className="sidebar" />}
            <div className="main-body">
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