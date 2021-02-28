class User {
    
    constructor() {
        this.profile = {
            name: '',
            username: '',
            password: '',
            major: '',
            birthday: ''
        };
    }

    set setName(name) {//setter for name
        this.profile.name = name;
    }

    get detail() {
        return this.profile;
    }

    set setUsername(input) {
        this.profile.username = input;
    }

    set setPassword(input) {
        this.profile.password = input;
    }

    set setMajor(major) {
        this.profile.major = major;
    }

    set setBirthday(input) {
        this.profile.birthday = input;
    }

    get name() {
        return this.profile.name;
    }

    get username() {
        return this.profile.username;
    }

    get password() {
        return this.profile.password;
    }

    get major() {
        return this.profile.major;
    }

    get birthday() {
        return this.profile.birthday;
    }
}

const aaa = new User();

//test part
