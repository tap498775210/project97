import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import picture from './567.png'


const user = { name: "Bob", Birthday: "2021-02-28", major: "computer science" };

//const profilePic = <img src="567.png" alt="sadfsfdsafds"/>;

function ProfileList(props) {
    const keys = Object.keys(props.user);
    const profile = keys.map((title, index) => 
        <li key={index.toString()}>
            {title}: {props.user[title]}
        </li>);

    return (
        <ul>{profile}</ul>
    );
}

function Page(props) {
    return (
        <>
            <img src={picture} alt="abc" width="320" height="200"/>
        < ProfileList user={props.user} />
        </>
    );
}

ReactDOM.render(
    <Page user={user}/>,
    document.getElementById('root')
);