import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {Alert, handleShow } from './alert'
import "./LoginForm.css";

<<<<<<< HEAD
// import global variables
import globalVal from './globalVar';

// const sampleUsernames = "aa";
// const samplePassword = "asdf";
// let loggedin = false;
=======
>>>>>>> 7f4c94d0a85a6b06897a3cd215257da2dfa011b7
let display = "block";

class LoginForm extends Component {
  // Didn't know what happened but: 
  // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
  _isMounted = false;

<<<<<<< HEAD
  // error message
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const updateUsername = (event) => {
    setUsername(event.target.value);
=======
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      doneLog: false,
      name: '',
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
>>>>>>> 7f4c94d0a85a6b06897a3cd215257da2dfa011b7
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
      setTitle("Login failed");
      setMessage("Please input username and password.");
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
            setTitle("Login failed");
            setMessage(errMessage);
            return (new Error(errMessage));
          } else if (res.status === 200) {
            let rescp = await res.clone().json(); // Get a copy
<<<<<<< HEAD
            props.setUserId(rescp._id);
            let json = await res.json();
            globalVal.id = json._id;
            globalVal.name = json.name;
            globalVal.course = json.course;
            globalVal.username = json.username;
            setDoneLog(true);
=======
            console.log(rescp);  // Debug
            let json = await res.json();
            console.log(json);

            // store login locally to prevent auto logout on refresh
            localStorage.setItem('username', this.state.username);
            localStorage.setItem('user_id', rescp._id);

            //setDoneLog
            this.setState({doneLog: true, name: json.name});
            this.props.setUser({id: rescp._id, username: this.state.username});
>>>>>>> 7f4c94d0a85a6b06897a3cd215257da2dfa011b7
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

<<<<<<< HEAD
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
=======
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
        </div>
      </>
    );
  }
>>>>>>> 7f4c94d0a85a6b06897a3cd215257da2dfa011b7
}

export default LoginForm;
