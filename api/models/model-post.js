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
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    comment: [{
        type: Schema.Types.ObjectId, 
        ref: "Comment",
    }]
}, { timestamps: true });

// run before deleting post
PostSchema.pre('findByIdAndDelete', function(next) {
    // remove all comments for this post
    this.model('Comment').deleteMany({ post: this._id }, next);
});

module.exports = mongoose.model('posts', PostSchema);