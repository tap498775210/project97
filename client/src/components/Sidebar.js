import React, { Component } from "react";
import { Link } from "react-router-dom";

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
          <li><Link to="/posts" className={'link'}>Posts</Link></li>
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
          {this.links()}
        </ul>
      </div>
    );
  }
}

export default Sidebar;