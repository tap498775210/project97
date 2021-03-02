import React from 'react';
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
                <form onSubmit={this.handleSubmit}>
                    <label>
                        want to provide an answer?<br/>
                        <input type='text' value={this.state.word} onChange={this.handleChange} />
                    </label>
                    <input type='submit' value='Submit' />
                </form>
            </>
        );
    }
}