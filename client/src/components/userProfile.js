import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MultiSelect from "react-multi-select-component";
import {Alert, handleShow } from './alert'
// import global variables
import globalVal from './globalVar';

var gotCourses = false;
var courses = [];
var courseNames = [];

//const profilePic = <img src="567.png" alt="sadfsfdsafds"/>;
function ProfileList(props) {
    // basic profile
    const[update, setUpdate] = useState(false); 

    // for updating
    const [Name, setName] = useState("");
    const [myCourses, setmyCourses] = useState([]);
    const [password, setPassword] = useState("");
    const [passwordComfirm, setPasswordComfirm] = useState("");

    // error message
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const updateName = (event) => {
        setName(event.target.value)
      }
      const updatePassword = (event) => {
        setPassword(event.target.value);
      };
      const updateComfirm = (event) => {
        setPasswordComfirm(event.target.value);
      };

      const changeUpdate = () => {
        setUpdate(!update);
      };

      // print courses
      const printCourses = ()=>{ 
        let temp = [];
        for(let i = 0; i < courseNames.length; i++)
            temp[i] = <p>{courseNames[i]}</p>
        return temp;
        };

      // get courses from db
    const getCourse = async () => {
        await fetch('http://localhost:9000/course/getall', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          })
            .then(async (res) => {
              if (res.status === 200) {
                var result = await res.json();
                var temp = [];
                var tempmyCourse = [];
                for(var i = 0; i < result.length; i++)
                {
                    temp[i] = {label: "", value: ""};
                    temp[i].label = result[i].name;
                    temp[i].value = result[i]._id;
                    if(globalVal.course.includes(result[i]._id))
                    {
                        courseNames.push(result[i].name);
                        tempmyCourse.push({label: result[i].name, value: result[i]._id});
                    }
                }
                courses = temp;
                // refresh
                setmyCourses(tempmyCourse);
              }
            })
            .catch(err => {
              console.log(err);
            });
    }

    // update user
    const UpdateProfile = async (event) => {
        event.preventDefault();
        // validation
        if (password != passwordComfirm){
            handleShow();
            setTitle("Update failed");
            setMessage("The confirm password does not match the password.");
            return;
        } else {
            // modify request
            let request = {};
            if (Name != "") 
                request.name = Name; 
            if (password != "")
                request.password = password;
            let courseID = [];
            for(var i = 0; i < myCourses.length; i++)
                courseID[i] = myCourses[i].value; 
            request.course = courseID;
            // send request
          await fetch('http://localhost:9000/users/update?_id='+globalVal.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
          })
            .then(async (res) => {
              if (res.status === 200) {
                let json = await res.json();
                globalVal.name = json.name;
                globalVal.course = json.course;
                courseNames = [];
                for(var i = 0; i < myCourses.length; i++)
                    courseNames[i] = myCourses[i].label; 
                changeUpdate();
              } 
              else {
                handleShow();
                setTitle("Update failed");
                setMessage("Server error, please try again!");
                return (new Error("update failed"));
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
        setName("")
        setPassword("");
        setPasswordComfirm("");
    }

    // logout
    const logout = () => {
        globalVal.id = null;
        globalVal.name = null;
        globalVal.course = null;
        globalVal.username = null;
        // refresh
        setmyCourses([]);
    }

    // fetch courses available
    if (!gotCourses && globalVal.id != null){
        gotCourses = true;
        getCourse();
    }

    if (update){
        return(
            <>
            <Form onSubmit={UpdateProfile}>
                <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Please do not use your real name"
                    value={Name}
                    onChange={updateName}
                />
                </Form.Group>
                <Form.Label>Courses</Form.Label>
                {courses.length?  
                    <MultiSelect
                        options={courses}
                        value={myCourses}
                        onChange={setmyCourses}
                        labelledBy={"Select"}
                    />
                : <p>No courses available so far</p>
                }
                <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Reset password"
                    value={password}
                    onChange={updatePassword}
                />
                </Form.Group>
                <Form.Group controlId="comfirmPassword">
                <Form.Label>Comfirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm your reset password"
                    value={passwordComfirm}
                    onChange={updateComfirm}
                />  
                </Form.Group>
                <Button className="mainButton" variant="primary" type="submit">
                    Confirm Update
                </Button>
                <Button className="mainButton" variant="secondary" onClick={changeUpdate}>
                    Cancel
                </Button>
            </Form>
                <Alert title={title} message={message}/>
            </>
        )

    }
    else if (globalVal.id){
        return(
            <>
            <h1>Welcome, {globalVal.name}!</h1>
            <br></br>
            <h4>Username: </h4>
            <p>{globalVal.username}</p>
            <br></br>
            <h4>Course: </h4>
            {!globalVal.course.length? <p>No course so far, try setting up one!</p>
            : printCourses()}
            <br></br>
            <Button className="profileButton" variant="primary" onClick={changeUpdate}>
            Update Profile
            </Button>
            <Button className="profileButton" variant="secondary" onClick={logout}>
            Logout
            </Button>
            </>
        );
    }
    else{
        return (
            <>
            <h1>Logged out, please login again. </h1>
            </>
        );
    }
}

export default function Page(props) {
    return (
        <>
        < ProfileList/>
        </>
    );
}
