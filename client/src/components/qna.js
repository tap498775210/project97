import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactDOM from 'react-dom';
import { useParams } from "react-router-dom";

function titlesAndIds(data) {
    let titleIdArr = [];
    data.forEach(element => titleIdArr.push({ title: element.title, id: element._id }));
    return titleIdArr;
}

function GetQuestion() {
    const [question, setQuestion] = useState("");
    let { id } = useParams();
    fetch("http://localhost:9000/post/gettem")  // Used a temporary function to get all posts
        // Will use '/getbycourse' when we can let the user to add courses
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => {
            const list = titlesAndIds(data);
            for (var i = 0; i < list.length; i++) {
                if (list[i].id === id)
                    setQuestion(list[i].title)
            }
        })

    console.log(question);
    return (
            <div>
            <h1>Original question: { question }</h1>
            </div>
        );
}

function GetAnswers() {
    const [answers, setAnswers] = useState([]);

    let { id } = useParams();
    const getUrl = "http://localhost:9000/comment/getbypostcreate?post=" + id;
    fetch(getUrl)
        .then(res => res.json())
        .then(res => console.log(res))
    return (
        <br/>
        );
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
        const { id } = this.props.match.params;

        this.state = {
            content: "",
            post: id 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        console.log(this.state);
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        });
    }

    handleSubmit= async (event) => {
        event.preventDefault();
        //console.log(this.state);
        if (this.state.content === "") {
            alert("You need to type something to answer");
        }
        else {
            let newAnswer = JSON.stringify(this.state);
            console.log(newAnswer);
            await fetch("http://localhost:9000/comment/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state),
            })
                .then(res => {
                    // response.json();
                    console.log(res.clone().status);
                })
        }

        return;
    }

    render() {
        return (
            <>
                <GetQuestion />
                <GetAnswers />
                <Answers />
                {/* <form onSubmit={this.handleSubmit}>
                    <label>
                        want to provide an answer?<br/>
                        <input type='text' value={this.state.content} onChange={this.handleChange} />
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
                            value={this.state.content}
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