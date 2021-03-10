import React, { Component } from "react";
import { /*BrowserRouter as Router,*/ Switch, Route, Link } from "react-router-dom";
import routes from "../routes.js";

import "./Sidebar.css"

/*
Reference: https://reactrouter.com/web/example/sidebar
*/

// Resizes sidebar when screen is resized
window.onresize = function() {
  let calcH = window.innerHeight;
  var img = document.getElementById("sbbd");
  if (img) {
    img.style.height = calcH;
  }
}

class Sidebar extends Component {
  links() {
    if (this.props.loggedIn) {
      return (
        <>
          <li><Link to="/" className={'link'}>Home</Link></li>
          <li><Link to="/questionAPI" className={'link'}>Posts</Link></li>
          <li><Link to="/search" className={'link'}>Search</Link></li>
          {/* A link to the user profile in the sidebar.  */}
          {/* <li><Link to="/profile"></Link></li> */}
        </>
      );
    } else {
      return (
        <>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </>
      )
    }
  }

  render() {
    return (
      <div id="sbbd" className="sidebar-body">
        {/* Links in the sidebar */}

        <ul style={{ listStyleType: "none", padding: 0 }}>
          {/* <li className="App-intro">
                    {this.state.apiResponse}
                    </li> */}
<<<<<<< HEAD
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
          <Route exact path="/" children={<div>Login here!</div>}/>
          <Route Route path="/user/:name" children={<div>View and modify your profile!</div>}/>
          <Route path="/questionAPI" children={<div>Read and ask questions!</div>}/>
=======
          {this.links()}
        </ul>

        {/* <Switch>
          <Route exact path="/" children={<div>home!</div>} />
          <Route path="/questionAPI" children={<div>posts!</div>} />
>>>>>>> 7f4c94d0a85a6b06897a3cd215257da2dfa011b7
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.sidebar />}
            />
          ))}
        </Switch> */}
      </div>
    );
  }
}

export default Sidebar;