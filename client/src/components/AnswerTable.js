import React from "react";
import Table from 'react-bootstrap/Table';

import "./AnswerTable.css";

// comment: {content, id}
function answerToCell(comment) {
  return (
    <tr borderless="true" key={comment.id}>
      <td>
          {comment.content}
      </td>
    </tr>
  );
}

export default function AnswerTable(props) {
  const comments = props.comments;
  const rows = comments.map((comments) => answerToCell(comments));
  const table = (
    <Table responsive id="atable">
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