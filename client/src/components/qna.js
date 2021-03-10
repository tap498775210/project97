import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactDOM from 'react-dom';
import { useParams } from "react-router-dom";

import "./qna.css";

function titlesAndIds(data) {
    let titleIdArr = [];
    data.forEach(element => titleIdArr.push({ title: element.title, id: element._id , content: element.content}));
    return titleIdArr;
}

function GetQuestion() {
    const [question, setQuestion] = useState("");
    const [content, setContent] = useState("");
    let { id } = useParams();
    fetch("http://localhost:9000/post/gettem")  // Used a temporary function to get all posts
        // Will use '/getbycourse' when we can let the user to add courses
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => {
            const list = titlesAndIds(data);
            var i;  // Iterator only sets question once after finding correct question
            for (i = 0; i < list.length; i++) {
                if (list[i].id === id)
                    break;
            }
            // Note that this method is still inefficient, want to use a backend function
            // such as getpostbyid if possible. Need to implement in future if time permits.
            setQuestion(list[i].title);
            setContent(list[i].content);
        })

    console.log(question);
    return (
            <div>
            <div className="boxed"><h3>{ question }</h3></div>
            <div className="boxed"><p>{ content }</p></div>
            </div>
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
            post: id,
            answers: [],
            ans_op: <br/>,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        console.log(this.state);
    }

    callAPI() {
        //console.log(this.state);
        const getCommentsUrl = "http://localhost:9000/comment/getbypostcreate?post=" + this.state.post;
        //const getPostUrl = "http://localhost:9000/post/getbypostid?id=" + this.state.post;

        /*fetch(getPostUrl)
            .then(res => res.json())
            .then(data => {
                var content = "";
                content.push(data.content)
                this.setState({ content: content });
                console.log("obtaining content: ");
                console.log(content);
            })
            */

        fetch(getCommentsUrl)
            .then(res => res.json())
            .then(data => {
                var answers = [];
                for (var i = 0; i < data.length; i++) {
                    answers.push(data[i].content);
                }
                this.setState({ answers: answers });
                //console.log(this.state.answers);
                console.log("obtaining answers: ");
                console.log(answers);

                /*const op = answers.map((answer) => {
                    <li>
                        {answer}
                    </li>
                });
                this.setState({ ans_op: op });
                console.log(this.state);*///tried to get a right format fot the answers but failed
            })
    }

    componentDidMount() { 
        this.callAPI();
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
                {/* <form onSubmit={this.handleSubmit}>
                    <label>
                        want to provide an answer?<br/>
                        <input type='text' value={this.state.content} onChange={this.handleChange} />
                    </label>
                    <input type='submit' value='Submit' />
                </form> */}
                <div className="inputbox" style={{width: "700px"}}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>Want to provide an answer?</Form.Label>
                    <Form.Group>
                        <Form.Control as='textarea' rows={3} 
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
                <div>
                <h5>{ this.state.answers }</h5>
                </div>
            </>
        );
    }
}