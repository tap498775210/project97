import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import { Redirect } from "react-router-dom";

// const sampleUsernames = "aa";
// const samplePassword = "asdf";
// let loggedin = false;
let display = "block";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const [doneLog, setDoneLog] = useState(false);
    const [name, setName] = useState("");

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent reloading when hitting the button??
    console.log("submit:");
    let usernamecp = username;
    let passwordcp = password;

      if (username === "" || password === "") {
          alert("Please input a username or password.");
          return;
      } else {
          await fetch('http://localhost:9000/users/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({username: usernamecp, password: passwordcp}),
          })
              .then(async (res) => {
                  if (res.status === 500) {
                      const errMessage = await res.text();
                      alert(errMessage);
                      return (new Error(errMessage));
                  } else if (res.status === 200) {
                      setDoneLog(true);
                      let json = await res.json();
                      console.log(json);
                      setName(json.name);
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

    console.log(usernamecp);
    console.log(passwordcp);
    setUsername("");
    setPassword("");
    };

    if (doneLog) {

        console.log(name);

        return (
            <Redirect to={"user/" + { name }} />
            );
    }

  return (
    <>
    <div className="Message"> 
      <Link to="/register" style={{color: "white"}}>
        First time? Click here to register!
      </Link>
    </div>
    <br />
    <h2> Login </h2>
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
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
    </>
  );
}

export default LoginForm;
