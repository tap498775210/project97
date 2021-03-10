import React from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

import "./QuestionTableV2.css";

// question: {title, id}
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
    <Table responsive id="table">
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

// function QuestionTableV2(props) {
//   const questions = props.questions;
//   const rows = questions.map((question) => questionToCellV2(question));
//   const table = (
//     <table>
//       <thead>
//         <tr>
//           <th>{props.title}</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rows}
//       </tbody>
//     </table>
//   );
//   return table;
// }

export default QuestionTableV2;
