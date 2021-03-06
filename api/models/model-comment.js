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

var PostModel = require('../models/model-post');

// User
let CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "users", 
    },
    post: {
        type: Schema.Types.ObjectId, 
        ref: "posts", 
        required: true,
    },
    content: {
        type: String, 
        required: true,
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: "users",
    }],
}, { timestamps: true });

// not used for now
/*
CommentSchema.pre('findOneAndDelete', function(next) {
    PostModel.deleteMany({comment: this._id})
    .then(doc => {
        console.log(doc);
        next();
    })
    .catch(err => {
        console.log("Failed to remove comment from the posts");
        next(err);
    });

});
*/

module.exports = mongoose.model('comments', CommentSchema);