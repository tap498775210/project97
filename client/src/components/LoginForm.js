import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {Alert, handleShow } from './alert'
import "./LoginForm.css";
import { Redirect } from "react-router-dom";

// import global variables
import globalVal from './globalVar';

// const sampleUsernames = "aa";
// const samplePassword = "asdf";
// let loggedin = false;
let display = "block";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [doneLog, setDoneLog] = useState(false);
  const [name, setName] = useState("");

  // error message
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit:");
    let usernamecp = username;
    let passwordcp = password;

    if (username === "" || password === "") {
      handleShow();
      setTitle("Login failed");
      setMessage("Please input username and password.");
      return;
    } else {
      await fetch('http://localhost:9000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernamecp, password: passwordcp }),
      })
        .then(async (res) => {
          if (res.status === 500) {
            const errMessage = await res.text();
            handleShow();
            setTitle("Login failed");
            setMessage(errMessage);
            return (new Error(errMessage));
          } else if (res.status === 200) {
            let rescp = await res.clone().json(); // Get a copy
            props.setUserId(rescp._id);
            let json = await res.json();
            globalVal.id = json._id;
            globalVal.name = json.name;
            globalVal.course = json.course;
            globalVal.username = json.username;
            setDoneLog(true);
          }
          else {
            const errMessage = await res.json();
            return (new Error(errMessage));
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    // console.log(usernamecp); // Debug
    // console.log(passwordcp); // Debug
    setUsername("");
    setPassword("");
  };

  let property = props.setUserId;

  if (globalVal.id == null && props.userId != null)
  {
    props.setUserId(null);
  }
  if (doneLog || globalVal.id != null) {
    return (
      <Redirect to={{
        pathname: "user/" + globalVal.id
      }} />
    );
  }

  return (
    <>
      <div className="Message">
        <Link to="/register" style={{ color: "white" }}>
          First time? Click here to register!
      </Link>
      </div>
      <br />
      <h2> Login </h2>
      <div className="LoginForm" display={display}>
        <Form onSubmit={handleSubmit}>
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
          <Button className="mainButton" variant="primary" type="submit">
            Login
        </Button>
        </Form>
        <Alert title={title} message={message}/>
      </div>
    </>
  );
}

export default LoginForm;
