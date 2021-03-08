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
        ref: "users",
    }],
    // not used for now
    comment: [{
        type: Schema.Types.ObjectId, 
        ref: "comments",
    }]
}, { timestamps: true });

// run before deleting post
PostSchema.pre('findOneAndDelete', function(next) {
    console.log(this._conditions._id);
    CommentModel.deleteMany({post: this._conditions._id})
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

// delete many posts
PostSchema.pre('deleteMany', function(next) {
    var conditions = this._conditions;
    if(Object.keys(conditions)[0]=="_id")
        conditions._id.$in = JSON.parse(this._conditions._id.$in); 
    this.find(conditions)
    .select({"_id": 1})
    .then(doc => {
        // reformat doc so that it can be used as parameter for deleteMany
        var arr = [];
        for (var i = 0; i < doc.length; i++)
        {
            arr[i] = doc[i]._id;
        }
        var newjson = {post: {$in:arr}};
        // delete comments with given post id
        CommentModel.deleteMany(newjson)
        .then(comments => {
            console.log(comments);
            next();
        })
        .catch(commenterr => {
            console.log("Failed to remove related comments");
            next(commenterr);
        });
    })
    .catch(err => {
        console.log("Failed to find posts");
        next(err);
    });
});

module.exports = mongoose.model('posts', PostSchema);

/*
    dateupdate:{
        type: Date, 
        default: Date.now,
    }, 
*/