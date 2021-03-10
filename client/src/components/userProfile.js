import React from 'react';
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

//const profilePic = <img src="567.png" alt="sadfsfdsafds"/>;

function ProfileList(props) {
    /*const user = { name: "Bob", Birthday: "2021-02-28", major: "computer science" };//this is for test now
    const keys = Object.keys(user);
    const profile = keys.map((title, index) => 
        <li key={index.toString()}>
            {title}: {user[title]}
        </li>);*/

    let { name } = useParams();

    console.log(name);
    

    /*return (
        <ul>{profile}</ul>
    );*/

    return (
        <h1>Welcome to Qiazza, {name}!</h1>
    );
}

// Clear locally stored user login and refresh to re-mount components
function handleLogout() {
    localStorage.clear();
    window.location.reload();
}

export default function Page(props) {
    return (
        <>
        <ProfileList />
        
        {/* Kind of rough implementation of signout button. Need to work on routing instead of href. */}
        <a href="http://localhost:3000/"><Button onClick={handleLogout}>Logout</Button></a>
        </>
    );
}
