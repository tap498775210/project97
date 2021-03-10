import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import QuestionTable from "./QuestionTable";  // Use V2
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
      newPost: {
        title: "", 
        user: this.props.userId,            // Need to login before creating posts
        // user: "60431fd54ac31e30045e359e" // Can use the hardcoded user id to avoid login everytime
        content: "", 
        course: "603d930c493bb1680c5d4f15", // Hard code for now ;_;
      },  
      apiResponse: "",
      posts: null,  // Store existing posts from the server
      titleId: [], // An array of {title, id}. Example of element: {title: 'abc', id: '12345'}
      // userId: this.props.userId,
    };
    // this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   // this.setState({ word: event.target.value });
  //   const newPost = this.state.newPost;
  //   if (event.target.name === 'title') {
  //     newPost.title = event.target.value;
  //   } else if (event.target.name === 'content') {
  //     newPost.content = event.target.value;
  //   } 

  //   this.setState({newPost: newPost});
  // }
  handleTitleChange(event) {
    this.setState({newPost: {
      title: event.target.value, 
      content: this.state.newPost.content,
      course: this.state.newPost.course,
      user: this.props.userId,
    }});
  }
  handleContentChange(event) {
    this.setState({newPost: {
      title: this.state.newPost.title, 
      content: event.target.value,
      course: this.state.newPost.course,
      user: this.props.userId,
    }});
  }
  // handleSubmit = async (event) => {
  //   event.preventDefault();     // Prevent refreshing the page when clicking "submit" button
  //   const response = await fetch("http://localhost:9000/questionAPI", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ word: this.state.word }),
  //   });
  //   console.log(response);//test
  //   console.log(response.body);//test

  //   const question = await response.json();
  //   console.log(`${question[0]}`);
  //   console.log(question);  // Debug
  //   this.setState({ word: "" });  // Empty the input box  // working =D
  //   this.setState({ apiResponse: question });
  //   console.log("is apiResponse an array: " + Array.isArray(this.state.apiResponse));// debug
  // }
  handleSubmit = async (event) => {
    event.preventDefault();     // Prevent refreshing the page when clicking "submit" button
    // We need this ^^^ to successfully submit posts.
    console.log("title: " + this.state.newPost.title);
    console.log("content: " + this.state.newPost.content);
    let newjs = JSON.stringify(this.state.newPost);
    console.log("newjs type: " + typeof newjs);
    console.log(newjs);
    if (this.state.newPost.title === "" && this.state.newPost.content === "") {
      alert("Your post is empty.");
      return;
    }
    else if (this.state.newPost.title === "") {   // Prevent posts from submitting to backend without title
      alert("Your post needs a title.");
      return;
    }
    else if (this.state.newPost.content === "") {  // Prevent posts from submitting to backend without content
      alert("Your post needs content.");
      return;
    }
    // Although we have backend error checking, the page still refreshes when submitting w/o title or body
    // so if someone submits but forgot a title, the whole body will be erased.
    else {  
      await fetch("http://localhost:9000/post/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.newPost),
      })
        .then(async (response) => {
          // response.json();
          console.log(response.clone().status);
        })

      // const question = await response.json();
      // console.log(`${question[0]}`);
      // console.log(question);  // Debug
      this.setState({ 
        newPost: {
          title: '', 
          content: '',
          user: this.props.userId,
          course: '603d930c493bb1680c5d4f15',
        },
      });  // Empty the input box  
      // this.setState({ apiResponse: question });
      // console.log("is apiResponse an array: " + Array.isArray(this.state.apiResponse));// debug
      window.location.reload(); // need to reload AFTER post is handled to display the table
    }
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
  // TODO: error handling
  callAPI() {
    fetch("http://localhost:9000/post/gettem")  // Used a temporary function to get all posts
                                                // Will use '/getbycourse' when we can let the user to add courses
      .then(res => res.json())
      // .then(data => console.log(data))
      .then(data => {
        this.setState({posts: data});
        // const titleAndIdArr = this.titlesAndIds();
        this.setState({titleId: this.titlesAndIds(data)});
        console.log("title and id");
        console.log(this.state.titleId);
      });
  }

  // Get titles and ids from the server returned posts. 
  titlesAndIds(data) {
    let titleIdArr = [];
    data.forEach(element => titleIdArr.push({title: element.title, id: element._id}));
    return titleIdArr;
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

/*
QuestionTableV2: generate a table of questions
Parameters: 
  title: the title of the table.  
  questions: an array of {title, id}, where title is the title of a post, id is the _id of a post
*/
  render() {
    console.log("Question: userId in newPost: " + this.state.newPost.user);  // Debug
    console.log('TAT');
    return (
      <>
        <div >
          <h1>Post a Question</h1>
        </div>

        {/* <form onSubmit={this.handleSubmit}>
          <label>
            Subject:
          <input type='text' value={this.state.word} onChange={this.handleChange} />
          </label>
          <input type='submit' value='Submit' />
        </form> */}
        
        <div className="boxed">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Control 
                type='text' 
                value={this.state.newPost.title}
                // name='title'
                placeholder='title' 
                // onChange={this.handleChange} 
                onChange={this.handleTitleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control as='textarea' rows={4} 
                type='text'
                value={this.state.newPost.content} // this.state.content not implemented yet
                // name='content'
                placeholder='details of your question'
                onChange={this.handleContentChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Post
            </Button>
          </Form>
        </div>

        <div id="QuestionTable" className="boxed">
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