import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@material-ui/icons/Search';
import QuestionTableV2 from './QuestionTableV2';

import './Search.css'

// InputGroup reference: https://react-bootstrap.github.io/components/input-group/
// Button reference: https://react-bootstrap.netlify.app/components/buttons/

function titlesAndIds(data) {
  let titleIdArr = [];
  data.forEach(element => titleIdArr.push({ title: element.title, id: element._id , content: element.content}));
  return titleIdArr;
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      results: [],  // empty array of format {title, id}
      showResults: false,         // Whether to render the results. Set to true after search
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
    event.preventDefault();   // Prevent refreshing the page when clicking "submit" button
    console.log(this.state.keyword);  // Debug
    this.getQuestions();
    this.setState({ showResults: true});
  }

  getQuestions() {
    fetch("http://localhost:9000/post/gettem")  // Used a temporary function to get all posts
        .then(res => res.json())
        .then(data => {
            const list = titlesAndIds(data);
            var search = [];
            for (var i = 0; i < list.length; i++) {
              if (list[i].title.toLowerCase().includes(this.state.keyword.toLowerCase()) || list[i].content.toLowerCase().includes(this.state.keyword.toLowerCase())) {
                search.push({ title: list[i].title, id: list[i].id});
              }
            }
            this.setState({ results: search });
            // Used for debugging
            console.log("obtaining results: ");
            console.log(search);
        })
    //this.setState({ keyword: ""});
  }

  render() {
    const resultTitle = "Showing " + this.state.results.length + " results";
    return (
      <>
        <div style={{ maxWidth: "1000px" }}>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search..."
                aria-label="Search..."
                aria-describedby="basic-addon2"
                type="search"   // Should have identical behaviors as type="text"
                value={this.state.keyword}
                onChange={(event) => this.setState({ keyword: event.target.value })}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">
                  <SearchIcon fontSize="small" />

                </Button>
                {/* <button type="button" class="btn btn-primary">
                            <SearchIcon />
                        </button> */}
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </div>
        <br />
        <div className="boxed">
          {this.state.showResults && <QuestionTableV2 questions={this.state.results} title={resultTitle}/>}
        </div>
      </>
    );
  }
}

export default Search;