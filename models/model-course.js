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
let CourseSchema = new Schema({
    name: {
        type: String, 
        required: true,
        index: {unique: true},
    },
});

module.exports = mongoose.model('Course', CourseSchema);