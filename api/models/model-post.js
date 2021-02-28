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
CourseSchema.pre('findByIdAndDelete', function(next) {
    // remove all comments for this post
    this.model('Comment').deleteMany({ post: this._id }, next);
});

module.exports = mongoose.model('Post', PostSchema);