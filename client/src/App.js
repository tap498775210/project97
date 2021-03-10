import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from "./components/Sidebar";
import routes from "./routes";
import Question from "./components/Question";
import Qna from "./components/qna";
import User from "./components/userProfile";

import './App.css';
import LoginForm from "./components/LoginForm";


class App extends Component {
  constructor() {  // setup for debug and 
      super();
      this.state = { 
        apiResponse: "",
        showHideSidebar: false,
        userId: null,   // Userid is set after login 
      };
      this.hideComponent = this.hideComponent.bind(this);
      this.setUserId = this.setUserId.bind(this);
      this.resize = this.resize.bind(this);
  }

  hideComponent() {   // used to toggle sidebar
    console.log(this.state.showHideSidebar)
    this.setState({ showHideSidebar: !this.state.showHideSidebar });
  }

  componentDidMount() {     
    window.addEventListener("resize", this.resize);   // Detect screen resize
    this.resize();  // Determine if the screen is large enough to show the sidebar
    // Reference: https://stackoverflow.com/questions/44480053/how-to-detect-if-screen-size-has-changed-to-mobile-in-react
  }

  resize() {  
    const isMobile = window.innerWidth <= 760;
    if (this.state.showHideSidebar === isMobile) {
      this.setState({showHideSidebar: !isMobile});
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  setUserId(id) {
    this.setState({userId: id});
  }

  render() {
    const { showHideSidebar } = this.state;
    console.log("App: userId: " + this.state.userId); // Debug
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
                <Route exact path="/" children={<LoginForm setUserId={this.setUserId} userId={this.state.userId}/>}/>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.main />}
                    />
                ))}
                <Route path="/questionAPI" children={<Question userId={this.state.userId}/>}/>
                <Route Route path="/q/:id" children={<Qna />} />
                <Route Route path="/user/:name" children={<User />}/>
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