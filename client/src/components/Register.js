// Register form
// Right now just copy and paste from LoginForm

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./LoginForm.css";

// const sampleUsernames = "aa";
// const samplePassword = "asdf";
// let loggedin = false;
let display = "block";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordComfirm, setPasswordComfirm] = useState("");

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
    console.log(usernamecp);    // Debug
    console.log(passwordcp);    // Debug
    console.log(passwordComfirmcp);   // Debug
    setUsername("");
    setPassword("");
    setPasswordComfirm("");
  };

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
            placeholder="comfirm your password"
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
