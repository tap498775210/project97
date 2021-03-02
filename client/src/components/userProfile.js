import React from 'react';
import ReactDOM from 'react-dom';




//const profilePic = <img src="567.png" alt="sadfsfdsafds"/>;

function ProfileList(props) {
    const user = { name: "Bob", Birthday: "2021-02-28", major: "computer science" };//this is for test now
    const keys = Object.keys(user);
    const profile = keys.map((title, index) => 
        <li key={index.toString()}>
            {title}: {user[title]}
        </li>);

    return (
        <ul>{profile}</ul>
    );
}

export default function Page(props) {
    return (
        <>
        < ProfileList/>
        </>
    );
}
