//this is module is intended to make all the data for the Q&A session
class Questions {
    constructor() {
        this.question = [];
    }

    get detail() {//get the array of the questions
        let i;
        let detail = [];
        const last_index = this.question.length - 1;
        for (i = 0; i < this.question.length; i++) {
            detail[i] = this.question[last_index - i].time.slice(0,10) + ' ' +
                this.question[last_index - i].time.slice(11,19) + '\n' +this.question[last_index - i].content + '\n';
        }
        return detail;
    }

    get length() {//how many questions
        return this.question.length;
    }

    addQuestion(newQ) {//add new questions
        let info = { content: '', time: '', answer: [] };
        let currentTime = new Date();
        info.time = currentTime.toISOString();
        info.content += newQ;
        this.question.push(info);
    }
}

const aaa = new Questions();//make a new Questions object for use when the server is running
module.exports.Questions = aaa;

class QNA extends Questions {
    constructor() {
        super();
    }

    addAnswer(index, newA) {//add an answer to a question specified by the index
        let currentTime = new Date();
        let tmpstr = currentTime.toISOString()
        let answer = tmpstr.slice(0, 10) + ' ' + tmpstr.slice(11, 19) + ' ' + newA;
        this.question[index].answer.push(answer);
    }

    getAnsLen(index) {//get the length fo answer for a question specified by index
        return this.question[index].answer.length;
    }

    getAnswer(index_q, index_a) {//get the answer specified by index_a for a question specified by index_q
        return this.question[index_q].answer[index_a];
    }
}

const bbb = new QNA();
module.exports.QNA = bbb;