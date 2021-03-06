import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@material-ui/icons/Search';
import QuestionTable from './QuestionTable';

// InputGroup reference: https://react-bootstrap.github.io/components/input-group/
// Button reference: https://react-bootstrap.netlify.app/components/buttons/

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      results: ["tem", "tem2"],   // Temporary pre-initialized
                                  // TODO: initialize it to an empty array after implementing all needed functions
      showResults: false,         // Whether to render the results. Set to true after search
                                  // Please point out if there is a better approprach or alternative common practice
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
    event.preventDefault();   // Prevent refreshing the page when clicking "submit" button
    console.log(this.state.keyword);  // Debug
    this.setState({keyword: "", showResults: true});
  }

  render() {
    const resultTitle = "Showing " + this.state.results.length + " results";
    return (
      <>
        <div>
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
        <div>
          {this.state.showResults && <QuestionTable questions={this.state.results} title={resultTitle}/>}
        </div>
      </>
    );
  }
}

export default Search;