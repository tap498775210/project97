import React, { useState, Component } from "react";
import Form from "react-bootstrap/Form";
import "./Question.css";
//import questionMark from "./../images/Orange_question.svg"

// src\components\Question.js
//   Line 1:17:  'useState' is defined but never used  no-unused-vars  

/*
props: 
  id: int
  isSovled: bool
  title: string
  content: a bing string??
  user: string
*/
class Question extends Component {
  //let solved_symbol = props.isSolved ? "✔" : "❔";
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/questionAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      // <div className="question">
      //   <h2 className="title">
      //     {solved_symbol} {props.title}
      //   </h2>
      //   <div className="qcontent">{props.content}</div>
      //   <div className="user">{props.user}</div>
      // </div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Post a problem:
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

export default Question;
