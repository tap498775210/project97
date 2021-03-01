import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LoginForm.css";

// const sampleUsernames = "aa";
// const samplePassword = "asdf";
// let loggedin = false;
let display = "block";
var test = "works";

function login() {
  fetch("/users/login",
  {
    method: "POST",
    body: JSON.stringify({
      "username": "testusername", 
      "password": "23456"
    }),
    headers: {"Content-Type": "application/json"}
  })
    .then(res => res.json())
    .then(res => console.log(res));
};

function get() {
  fetch("/users/get?username=testusername3",
  {
    method: "GET",
  })
    .then(res => res.json())
    .then(res => console.log(res));
};

login();
get();

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent reloading when hitting the button??
    console.log("submit:");
    let usernamecp = username;
    let passwordcp = password;
    console.log(usernamecp);
    console.log(passwordcp);
    setUsername("");
    setPassword("");
  };
  console.log("way");
  return (
    <div className="LoginForm" display={display}>
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
        <Button variant="primary" type="submit" onclick={login}>
          {test}
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
