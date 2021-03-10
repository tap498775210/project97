import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from "./components/Sidebar";
import routes from "./routes";
import Question from "./components/Question";
import Qna from "./components/qna";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import './App.css';

class App extends Component {
  constructor() {  // setup for debug and 
      super();
      this.state = { 
        apiResponse: "",
        showHideSidebar: false,
        userId: "",   // Userid is set after login 
        username: "",
      };
      this.hideComponent = this.hideComponent.bind(this);
      this.setUser = this.setUser.bind(this);
      this.resize = this.resize.bind(this);
  }

  hideComponent() {   // used to toggle sidebar
    console.log(this.state.showHideSidebar)
    this.setState({ showHideSidebar: !this.state.showHideSidebar });
  }

  componentDidMount() {     
    const loggedInUsername = localStorage.getItem('username');
    const loggedInID = localStorage.getItem('user_id');
    if (loggedInUsername) {
      this.setState({"username": loggedInUsername});
      this.setState({"userId": loggedInID});
    }

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

  setUser(userinfo) {
    // console.log(userinfo)
    this.setState({userId: userinfo.id, username: userinfo.username});
  }

  render() {
    const { showHideSidebar } = this.state;
    const loggedIn = this.state.userId !== '';
    const redirectUserPath = '/user/' + this.state.username;
    console.log("App: userId: " + this.state.userId); // Debug
    console.log("App: username: " + this.state.username); // Debug
    console.log('App: loggedIn: ' + loggedIn);
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
            {showHideSidebar && <Sidebar loggedIn={loggedIn} className="sidebar" />}
            <div className="main-body">
              <Switch>
                {/* <Route exact path="/" children={
                  <LoginForm setUser={this.setUser}/>
                }/> */}
                <Route exact path='/'>
                  {loggedIn ? 
                    <Redirect to={redirectUserPath} /> : <LoginForm setUser={this.setUser} />}
                </Route>
                <Route path='/register'>
                  {loggedIn ? <Redirect to={redirectUserPath} /> : <Register />}
                </Route>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.main />}
                    />
                ))}
                <Route path="/questionAPI" children={<Question userId={this.state.userId}/>}/>
                {/* <Route path="/questionAPI">
                  {loggedIn ? 
                    <Question userId={this.state.userId}/> : <Redirect exact to='/' />
                  }
                </Route> */}

                <Route Route path="/q/:id" component={Qna} />
                {/* <Route Route path="/q/:id" >
                  {loggedIn ? <Qna /> : <Redirect exact to='/' />}
                </Route> */}
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