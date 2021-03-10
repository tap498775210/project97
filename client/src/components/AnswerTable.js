import React from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

// answer: {title, id}
function questionToCellV2(question) {
  const link = "/q/" + question.id.toString();
  return (
    <tr borderless="true" key={question.id.toString()}>
      <td>
        <Link to={link}>
          {question.title}
        </Link>
      </td>
    </tr>
  );
}


function QuestionTableV2(props) {
  const questions = props.questions;
  const rows = questions.map((question) => questionToCellV2(question));
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

export default QuestionTableV2;
