// Register form
// Right now just copy and paste from LoginForm

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const fetch = require('node-fetch');

// const sampleUsernames = "aa";
// const samplePassword = "asdf";
// let loggedin = false;
let display = "block";

function checkInfo(username, password, confirmP) {
    if (username === "" || password === "" || confirmP === "") {
        alert("Please enter all the information.");
        return false;
    }

    if (password !== confirmP) {
        alert("The confirm password does not match the password.");
        return false;
    }

    return true;
}

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const [passwordComfirm, setPasswordComfirm] = useState("");
    const [doneReg, setDoneReg] = useState(false);

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };
  const updateComfirm = (event) => {
    setPasswordComfirm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent reloading when hitting the button
    console.log("submit:");
    let usernamecp = username;
    let passwordcp = password;
    let passwordComfirmcp = passwordComfirm;
    let successful = false;

      if (checkInfo(usernamecp, passwordcp, passwordComfirmcp)) {

          successful = fetch('http://localhost:9000/users/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: 'someName', username: usernamecp, password: passwordcp}),
          })
              .then(res => {
                  if (res.status !== 201) {
                      alert("register failed, please try again!");
                      return (new Error("failed"));
                  }
                  else
                      return res.json();

              })
              .then(json => {
                  console.log(json);
                  return true;
              })
              .catch(err => {
                  console.log(err);
              });
      }

      console.log(successful);

      if (successful) {
          alert("register succeed!!");
          setDoneReg(true);
      }

    console.log(usernamecp);    // Debug
    console.log(passwordcp);    // Debug
    console.log(passwordComfirmcp);   // Debug
    setUsername("");
    setPassword("");
    setPasswordComfirm("");
    };

    if (doneReg) {
        return(
            <>
                <h>Congradulation!! You have Signed up. Please go log in.</h>
            </>
        );
    }

  return (
    <>
    <div className="Message"> 
      <Link to="/" style={{color: "white"}}>
        Returned user? Click here to login!
      </Link>
    </div>
    <br />
    <h2> Register </h2>
    <div className="Register" display={display}>
      <Form onSubmit={handleSubmit}>
        {/* <Form.Control type="text" placeholder="Normal text" /> */}
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please do not use your real username"
            value={username}
            onChange={updateUsername}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Please do not use your real password"
            value={password}
            onChange={updatePassword}
          />
        </Form.Group>
        <Form.Group controlId="comfirmPassword">
          <Form.Label>Comfirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm your password"
            value={passwordComfirm}
            onChange={updateComfirm}
          />  
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
    </>
  );
}

export default Register;
