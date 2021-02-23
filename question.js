//this is module is intended to make all the data for the Q&A session
class Questions {
    length = 0;
    
    constructor() {
        this.question = [];
    }

    get detail() {//get the array of the questions
        let i;
        let detail = [];
        for (i = 0; i < this.question.length; i++) {
            detail[i] = this.question[i].time.slice(0,9) + ' ' +
                this.question[i].time.slice(11,19) + "<br>" + this.question[i].content;
        }
        return detail;
    }

    get length() {//how many questions
        return this.length;
    }

    addQuestion(newQ) {//add new questions
        let info = { content: '', time: '', answerIndex: [] };
        let currentTime = new Date();
        info.time = currentTime.toISOString();
        info.content += newQ;
        this.question.push(info);
        this.length += 1;
    }
}

const aaa = new Questions();//make a new Questions object for use when the server is running
module.exports.Questions = aaa;