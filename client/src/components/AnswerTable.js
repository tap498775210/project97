import React from "react";
import Table from 'react-bootstrap/Table';

import "./AnswerTable.css";

// comment: {answers}
function answerToCell(comment) {
  return (
    <tr borderless="true" >
      <td>
          {comment}
      </td>
    </tr>
  );
}

export default function AnswerTable(props) {
  const comments = props.comments;
  const rows = comments.map((comments) => answerToCell(comments));
  const table = (
    <Table responsive >
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