import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import QuestionTable from "./QuestionTable";
import QuestionTableV2 from "./QuestionTableV2";
import "./Question.css";

/*
Table reference: https://react-bootstrap.github.io/components/table/
*/

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      apiResponse: "",
      posts: null,  // Store posts from the server
      titles: [],
      titleId: [],
      userId: this.props.userId,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ word: event.target.value });
  }
  handleSubmit = async (event) => {
    event.preventDefault();     // Prevent refreshing the page when clicking "submit" button
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
    this.setState({ apiResponse: question });
    console.log("is apiResponse an array: " + Array.isArray(this.state.apiResponse));// debug
  }

  // callAPI() {
  //   fetch("http://localhost:9000/questionAPI")
  //     .then(res => res.json())
  //     .then(res => this.setState({ apiResponse: res }));
  // }

  /*
      TODO: find the courses associated with the user
            then get the posts associated by the courses
  */
  // Temporary
  callAPI() {
    fetch("http://localhost:9000/post/gettem")
      .then(res => res.json())
      // .then(data => console.log(data))
      .then(data => {
        this.setState({posts: data});
        // console.log(this.state.posts[0]);  // Debug
        const titleArr = this.titles();
        // console.log(titleArr);    // // Debug
        this.setState({titles: titleArr});
        // console.log(this.state.titles);   // Debug
        console.log("title and id");
        // const titleAndIdArr = this.titlesAndIds();
        this.setState({titleId: this.titlesAndIds()});
        console.log(this.state.titleId);
      });
  }

  // Get titles from this.state.posts
  titles() {
    let titleArr = [];    
    // console.log("is array: "+ Array.isArray(this.state.posts)); // Debug
    let posts = this.state.posts;
    posts.forEach(post => titleArr.push(post.title));
    return titleArr;
  }

  titlesAndIds() {
    let titleAndIdArr = [];
    let posts = this.state.posts;
    posts.forEach(post => titleAndIdArr.push({title: post.title, id: post._id}));
    return titleAndIdArr;
  }

  componentDidMount() {   // Changed Will to Did to erase a warning
    this.callAPI();
    // console.log("typeof data: " + typeof this.state.data);
    // console.log("is array: " + Array.isArray(this.state.data));
    // console.log("data: " + this.state.data);
  }


// =======================================================================
//                           Unused functions 
// -----------------------------------------------------------------------
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

  // A function that generate a link for each question
  // Right now the link is "localhost:3000/q/[id]", 
  // where [id] right now is (the size of the question list - index of the question)
  // The solution here may not be ideal because each time we make a new question we compute all the ids again
  // One alternative is to compute the id and store it to the backend
  // But a new challenge of this approach is that we might need to do more work on passing the json back and forth
  questionToLink(question, id) {
    const link = "/q/" + id.toString();
    return (
      <li key={id.toString()} className="post">
        <Link to={link}>{question}</Link>
      </li>
    );
  }
// -----------------------------------------------------------------------
// =======================================================================

  render() {
    // console.log("Question: userId: " + this.state.userId);  // Debug
    return (
      <>
        <div>
          <h1>Post a Question</h1>
        </div>

        {/* <form onSubmit={this.handleSubmit}>
          <label>
            Subject:
          <input type='text' value={this.state.word} onChange={this.handleChange} />
          </label>
          <input type='submit' value='Submit' />
        </form> */}
        
        <div className="inputbox" style={{width: "700px"}}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Control 
                type='text' 
                value={this.state.word}
                placeholder='title' 
                onChange={this.handleChange} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Control as='textarea' rows={5} 
                type='text'
                value={this.state.content} // this.state.content not implemented yet
                //onChange={}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Post
            </Button>
          </Form>
        </div>
        <br />

        <div>
          {<QuestionTableV2
            questions={this.state.titleId}
            title="Questions"
          />}
        </div>
      </>
    );
  }
}

export default Question;