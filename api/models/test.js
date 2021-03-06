//const UserModel = require('./model-user');
const fetch = require("node-fetch");

let aaa = {
    name: "bob",
    username: "abc123",
    password: "123456",
};

let bbb = {
    name: "Yasuo",
    username: "cba456",
    password: "123456",
};

let ccc = {
    username: "abc123",
    password: "123456",
};

//let model = new UserModel(aaa);

/*model.save()
    .then(doc => {
        if (!doc || doc.length === 0) {
            console.log("the data is not saved");
            return;
        }

        console.log(doc);
    })
    .catch(err => {
        console.log(err);
});
*/

/*UserModel.findOne({
    username: aaa.username
})
    .then(doc => {
        console.log(doc);
    })
    .catch(err => {
        console.log(err);
    });
*/

//test register function
/*fetch('http://localhost:9000/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bbb),
})
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => {
        console.log(err);
    });*/

//test login function
/*fetch('http://localhost:9000/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ccc),
})
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => {
        console.log(err);
    });*/

//test get function
/*fetch('http://localhost:9000/users/get?_id=603f1ac29c814c552c1eb324', {
    method: 'GET',
})
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => {
        console.log(err);
    });*/

/*fetch('http://localhost:9000/users/update?_id=603f1ac29c814c552c1eb324', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: "Yone" }),
})
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => {
        console.log(err);
    });*/

/*fetch('http://localhost:9000/users/delete?_id=603f1ac29c814c552c1eb324', {
    method: 'DELETE',
})
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => {
        console.log(err);
    });*/