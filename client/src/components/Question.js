//import React, { useState, Component } from "react";
import React, { Component } from "react";
//import Form from "react-bootstrap/Form";
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
    this.state = { 
      word: "",
      apiResponse: "" 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({word: event.target.value});
  }
  handleSubmit = async (event) => {
    event.preventDefault();     // Prevent reflesh the page when clicking "submit" button
    const response = await fetch("http://localhost:9000/questionAPI", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: this.state.word }),
    });
    const question = await response.text();
    console.log(question);  // Debug
    // this.setState({apiResponse})
    this.setState({word: ""});  // Empty the input box  // NOT WORKING ='(
  }

  callAPI() {
    fetch("http://localhost:9000/questionAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  componentDidMount() {   // Changed Will to Did to erase a warning
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
          <input type='text' value={this.state.word} onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

export default Question;
