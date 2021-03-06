const { compareSync } = require('bcrypt');
const cookieParser = require('cookie-parser');

// database setup
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const server = 'cluster0.wbhcp.mongodb.net';
const database = 'db97';
const user = 'cs97w2021';
const password = 'Aa02252021';

// login to database
mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`, { useNewUrlParser: true, 'useUnifiedTopology': true, 'useCreateIndex': true}, (err) =>{
    throw err;
});

var CommentModel = require('../models/model-comment');

// User
let PostSchema = new Schema({
    title: {
        type: String, 
        required: true,
    }, 
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
    },
    dateupdate:{
        type: Date, 
        default: Date.now,
    }, 
    content: {
        type: String, 
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    }, 
    // not used for now
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    // not used for now
    comment: [{
        type: Schema.Types.ObjectId, 
        ref: "Comment",
    }]
}, { timestamps: true });

// run before deleting post
PostSchema.pre('findOneAndDelete', function(next) {
    CommentModel.deleteMany({post: this._id})
    .then(doc => {
        console.log(doc);
        next();
    })
    .catch(err => {
        console.log("Failed to remove related comments");
        next(err);
    })

    // this.model('Comment').deleteMany({ post: this._id }, next);
});

module.exports = mongoose.model('posts', PostSchema);