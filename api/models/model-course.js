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
let CourseSchema = new Schema({
    name: {
        type: String, 
        required: true,
        index: {unique: true},
    },
});

// run before deleting course
CourseSchema.pre('findByIdAndDelete', function(next) {
    // remove all posts for this course
    this.model('Post').deleteMany({ course: this._id }, next);
});

module.exports = mongoose.model('Course', CourseSchema);