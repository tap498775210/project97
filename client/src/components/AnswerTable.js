import React from "react";
import Table from 'react-bootstrap/Table';

import "./AnswerTable.css";

// comment: {answers}
function answerToCell(comment, index) {
  return (
    <tr borderless="true"  key={index}>
      <td>
          {comment}
      </td>
    </tr>
  );
}

export default function AnswerTable(props) {
  const comments = props.comments;
  console.log(comments);
  const rows = comments.map((comments, index) => answerToCell(comments, index));
  const table = (
    <Table responsive id="table">
      <thead id="title">
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