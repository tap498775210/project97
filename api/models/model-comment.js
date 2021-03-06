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
}, { timestamps: true });

module.exports = mongoose.model('comments', CommentSchema);