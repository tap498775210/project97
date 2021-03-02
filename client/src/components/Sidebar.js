import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes from "../routes.js";

import "./Sidebar.css"

class Sidebar extends Component {
    render () {
        return  (
            <div class="sidebar-body">
                {/* Links in the sidebar */}
                
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {/* <li className="App-intro">
                    {this.state.apiResponse}
                    </li> */}
                    <li>
                    <Link to="/">Home/Login</Link>
                    </li>
                    <li>
                    <Link to="/register">Register</Link>
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
                        children={<route.sidebar />}
                    />
                    ))}
                </Switch>
            </div>
        );
    }
}

export default Sidebar;