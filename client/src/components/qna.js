import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactDOM from 'react-dom';

class Question extends React.Component {
    render() {
        return (
            <h1> This is the question part.</h1>
        );
    }
}

class Answers extends React.Component {
    render() {
        return (
            <div>
                <p>this is the answer part.</p>
            </div>
        );
    }
}

export default class Qna extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: ""
        };
    }

    handleChange() {

    }

    render() {
        return (
            <>
                <Question />
                <Answers />
                {/* <form onSubmit={this.handleSubmit}>
                    <label>
                        want to provide an answer?<br/>
                        <input type='text' value={this.state.word} onChange={this.handleChange} />
                    </label>
                    <input type='submit' value='Submit' />
                </form> */}
                <br />
                <div className="inputbox" style={{width: "700px"}}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>want to provide an answer?</Form.Label>
                    <Form.Group>
                        <Form.Control as='textarea' rows={5} 
                            type='text' 
                            value={this.state.word}
                            placeholder='Your response...' 
                            onChange={this.handleChange} 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Answer
                    </Button>
                </Form>
                </div>
            </>
        );
    }
}