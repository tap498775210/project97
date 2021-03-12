// Register form
// Right now just copy and paste from LoginForm

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {Alert, handleShow } from './Alert'
import "./LoginForm.css";

const fetch = require('node-fetch');

// const sampleUsernames = "aa";
// const samplePassword = "asdf";
// let loggedin = false;
let display = "block";

function checkInfo(Name, username, password, confirmP) {
    if (Name ==="" || username === "" || password === "" || confirmP === "") {
      return [false, "Please enter all the information."];
    }

    if (password !== confirmP) {
      return [false, "The confirm password does not match the password."];
    }

    return [true];
}

function Register() {
  const [Name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordComfirm, setPasswordComfirm] = useState("");
  const [doneReg, setDoneReg] = useState(false);

  // for alertbox
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const updateName = (event) => {
    setName(event.target.value)
  }
  const updateUsername = (event) => {
    setUsername(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };
  const updateComfirm = (event) => {
    setPasswordComfirm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent reloading when hitting the button
    let namecp = Name;
    let usernamecp = username;
    let passwordcp = password;
    let passwordComfirmcp = passwordComfirm;
    let validation = checkInfo(namecp, usernamecp, passwordcp, passwordComfirmcp);

      if (validation[0]) {

          await fetch('http://localhost:9000/users/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: namecp, username: usernamecp, password: passwordcp}),
          })
              .then(res => {
                  if (res.status !== 201) {
                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                      handleShow();
                      setTitle("Register failed");
                      setMessage("Username already existed!");
                    }
                    else
                    {
                      handleShow();
                      setTitle("Register failed");
                      setMessage("Server error, please try again!");
                    }
                    return (new Error("register failed"));
                  }
                  else {
                      let json = res.json();
                      console.log(json);
                      setDoneReg(true);
                      return;
                  }
              })
              .catch(err => {
                  console.log(err);
              });
      }
      else{
        handleShow();
        setTitle("Register failed");
        setMessage(validation[1]);
      }
    setName("");
    setUsername("");
    setPassword("");
    setPasswordComfirm("");
    };

    if (doneReg) {
        return(
            <>
                <h>Congradulation!! You have Signed up. Please login.</h>
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
      <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please do not use your real name"
            value={Name}
            onChange={updateName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            value={username}
            onChange={updateUsername}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
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
      <Alert title={title} message={message}/>
    </div>
    </>
  );
}

export default Register;
