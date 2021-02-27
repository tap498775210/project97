// database setup
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const server = '127.0.0.1:27017';
const database = 'db97';
const user = 'cs97user';
const password = 'cs97pwd';

// login to database
mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true, 'useUnifiedTopology': true, 'useCreateIndex': true}, (err) =>{
    throw err;
});

// User
let CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
    },
    post: {
        type: Schema.Types.ObjectId, 
        ref: "Post", 
    },
    dateupdate:{
        type: Date, 
    }, 
    content: {
        type: String, 
        required: true,
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
});

module.exports = mongoose.model('Comment', CommentSchema);