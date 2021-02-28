import React from 'react';
//import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

// src\components\NavigationBar.js
//   Line 2:10:  'Nav' is defined but never used          no-unused-vars
//   Line 2:23:  'Form' is defined but never used         no-unused-vars
//   Line 2:29:  'FormControl' is defined but never used  no-unused-vars


// A minimum navbar
function NavigationBar() { 
    return (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
            Qiazza
        </Navbar.Brand>
    </Navbar>
    );
}

export default NavigationBar;