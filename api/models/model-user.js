// database setup
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

const server = 'cluster0.wbhcp.mongodb.net';
const database = 'db97';
const user = 'cs97w2021';
const password = 'Aa02252021';

// login to database
mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`, { useNewUrlParser: true, 'useUnifiedTopology': true, 'useCreateIndex': true}, (err) =>{
    throw err;
});

// used to remove reference in posts and comments
var PostModel = require('../models/model-post');
var CommentModel = require('../models/model-comment');

// User
let UserSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },
    course: [{
        type: Schema.Types.ObjectId,
        ref: "courses",
    }],
    username: {
        type: String, 
        required: true,
        index: {unique: true},
    }, 
    password: {
        type: String, 
        required: true,
    }
});

// run before deleting user
UserSchema.pre('findOneAndDelete', function(next) {  
    // delete posts firsts
    PostModel.deleteMany({ user: this._conditions._id })
        .then(post => {
            console.log(post);
            // delete comments
            CommentModel.deleteMany({ user: this._conditions._id })
                .then(comment => {
                    console.log(comment);
                    next();
                })
                .catch(errcomment => {
                    console.log("Failed to remove related comments"); 
                    next(errcomment); 
                });
        })
        .catch(err => {
            console.log("Failed to remove related posts"); 
            next(err); 
        });
    });

// hash password
UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// run before update
UserSchema.pre('findOneAndUpdate', function(next) {
    var user = this;

    if (!user._update.hasOwnProperty('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
            
        // hash the password using our new salt
        user._update.password = bcrypt.hashSync(user._update.password, salt);
        next();
    });
});

// compare password
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('users', UserSchema);