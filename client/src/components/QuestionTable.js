import React from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

// Generate a cell inside the table for each question
function questionToCell(question, id) {
    const link = "/q/" + id.toString();
    return (
      <tr borderless="true" key={id.toString()}>
        <td>
          <Link to={link}>
            {question}
          </Link>
        </td>
      </tr>
    );
}

// Generate a table containing questions
// props: 
//  title: the header of the table
//  questions: array containing strings of questions (titles)
function QuestionTable(props) {
    const questions = Array.from(props.questions);
    const rows = questions.map((question, index) => 
      questionToCell(question, questions.length - index)
    );
    const table = (
      <Table responsive >
        <thead>
          <tr>
            <th>{props.title}</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    );
    return table;
}

export default QuestionTable;