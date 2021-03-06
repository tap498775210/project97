import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Alert, handleShow } from "./Alert"
import "./LoginForm.css";

let display = "block";

class LoginForm extends Component {
  // Didn't know what happened but: 
  // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      doneLog: false,
      name: '',
      title: 'Login failed',
      message: '',
    }
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState = (state, callback) => {
      return;
    };
  }

  updateUsername = (event) => {
    this.setState({username: event.target.value});
  };
  updatePassword = (event) => {
    this.setState({password: event.target.value});
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit:");
    let username = this.state.username;
    let password = this.state.password;

    if (username === "" || password === "") {
      handleShow();
      this.setState({message: "Please input a username or password."})
      return;
    } else {
      await fetch('http://localhost:9000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then(async (res) => {
          if (res.status === 500) {
            const errMessage = await res.text();
            handleShow();
            this.setState({message: errMessage})
            return (new Error(errMessage));
          } else if (res.status === 200) {
            let rescp = await res.clone().json(); // Get a copy
            console.log(rescp);  // Debug
            let json = await res.json();
            console.log(json);

            // store login locally to prevent auto logout on refresh
            localStorage.setItem('user_id', json._id);
            localStorage.setItem('name', json.name);
            localStorage.setItem('course', json.course);
            localStorage.setItem('username', json.username);

            //setDoneLog
            this.setState({doneLog: true, name: json.name});
            this.props.setUser({id: rescp._id, username: this.state.username});
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
    this.setState({username: "", password: ""});
  };

  // if (doneLog) {


  //   let name = this.state.name;
  //   console.log(name);

  //   return (
  //     <Redirect to={"user/" + { name }} />
  //   );
  // }

  render() {
    return (
      <>
        {/* {this.state.doneLog && <Redirect to={"/user/" + this.state.username} />} */}
        <div className="Message">
          <Link to="/register" style={{ color: "white" }}>
            First time? Click here to register!
        </Link>
        </div>
        <br />
        <h2> Login </h2>
        <h5> to display site contents </h5>
        <div className="LoginForm" display={display}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                value={this.state.username}
                onChange={this.updateUsername}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.updatePassword}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
          </Button>
          </Form>
          <Alert title={this.state.title} message={this.state.message}/>
        </div>
      </>
    );
  }
}

export default LoginForm;
