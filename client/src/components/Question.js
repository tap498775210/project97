//import React, { useState, Component } from "react";
import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Link, Switch, Route } from "react-router-dom";
import Table from 'react-bootstrap/Table'
//import Form from "react-bootstrap/Form";
import "./Question.css";

/*
Table reference: https://react-bootstrap.github.io/components/table/
*/

class Question extends Component {
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
    event.preventDefault();     // Prevent refresh the page when clicking "submit" button
    const response = await fetch("http://localhost:9000/questionAPI", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: this.state.word }),
    });
    console.log(response);//test
    console.log(response.body);//test

    const question = await response.json();
    console.log(`${question[0]}`);
    console.log(question);  // Debug
    this.setState({ word: "" });  // Empty the input box  // working =D
    this.setState({apiResponse: question });
    console.log("is apiResponse an array: " + Array.isArray(this.state.apiResponse));// debug
  }

  callAPI() {
    fetch("http://localhost:9000/questionAPI")
        .then(res => res.json())
        .then(res => this.setState({ apiResponse: res }));
  }

  componentDidMount() {   // Changed Will to Did to erase a warning
    this.callAPI();
  }

  // Generate a list of questions
  // It seems to execute whenever we type a character in the input box
  questionList() {
    const questions = Array.from(this.state.apiResponse);   // Generate a javascript array from apiResponse
                                                            // Otherwise it won't let me use map
    console.log("is questions an array: " + Array.isArray(questions));
    const listItems = questions.map((question, index) =>
      this.questionToLink(question, questions.length - index)  // Call a function to generate a link for each question
    );
    const list = <ul>{listItems}</ul>
    return list;
  }

  // Generate a table for the quesions
  questionTable() {
    const questions = Array.from(this.state.apiResponse);
    const rows = questions.map((question, index) => 
      this.questionToCell(question, questions.length - index)
    );
    const table = (
      <Table responsive bodered >
        <thead>
          <tr>
            <th>Questions</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    );
    return table;
  }
  // Generate a cell inside the table for each question
  questionToCell(question, id) {
    const link = "/q/" + id.toString();
    return (
      <tr boderless="true">
        <td>
          <Link to={link}>
            {question}
          </Link>
        </td>
      </tr>
    );
  }

  // An example of react-bootstrap Table. Right now it has only one column
  exampleQuestionTable() {    
    return(
      <Table responsive bodered>
        <thead> 
          <tr>  {/* A row */}
            <th>Questions</th>  {/* The head of the table */}
          </tr>
        </thead>
        <tbody>
          <tr>  {/* A row */}
            <td>abc</td>  {/* A data cell */}
          </tr>
          <tr>
            <td>def</td>
          </tr>
        </tbody>
      </Table>
    );
  }

  // A function that generate a link for each question
  // Right now the link is "localhost:3000/q/[id]", 
  // where [id] right now is (the size of the question list - index of the question)
  // The solution here may not be ideal because each time we make a new question we compute all the ids again
  // One alternative is to compute the id and store it to the backend
  // But a new challenge of this approach is that we might need to do more work on passing the json back and forth
  questionToLink(question, id) {
    const link = "/q/" + id.toString();
    return(
      <li key={id.toString()} className="post"> 
        <Link to={link}>{question}</Link>
      </li>
    );
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
        //show the post form submit window and questions 
        <>
        <div>
          <h1>Post a Question</h1>
        </div>

        <form onSubmit={this.handleSubmit}>
        <label>
          Subject:
          <input type='text' value={this.state.word} onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit' />
        </form>
        <br />
        <div>
          {this.questionTable()}
        </div>
        {/* <div>
          {this.exampleQuestionTable()}
        </div> */}
        {/* <div className='questionList'>        
          {this.questionList()}
        </div> */}
        {/* <div>
                <p>{this.state.apiResponse}</p>
        </div> */}
        </>
    );
  }
}

export default Question;
