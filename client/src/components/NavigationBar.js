import React, { Component } from "react";
//import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import MenuIcon from '@material-ui/icons/Menu';
import { Navbar } from 'react-bootstrap';

import "./NavigationBar.css"

// src\components\NavigationBar.js
//   Line 2:10:  'Nav' is defined but never used          no-unused-vars
//   Line 2:23:  'Form' is defined but never used         no-unused-vars
//   Line 2:29:  'FormControl' is defined but never used  no-unused-vars


// A minimum navbar
class NavigationBar extends Component { 
    render () {
        return (
            <Navbar bg="dark" variant="dark">
                <MenuIcon fontSize="large" style={{ color: "white"}} />
                <Navbar.Brand style={{
                    paddingLeft: "20px",
                    fontSize: "25px",
                }}>
                    Qiazza
                </Navbar.Brand>
            </Navbar>
        );
    }
}

export default NavigationBar;