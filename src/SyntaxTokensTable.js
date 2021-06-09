import React, {useState} from 'react';

const SyntaxTokensTable = ({result}) => {

    const res = result.SyntaxTokens ? result.SyntaxTokens : [];
    return(
        <table>
            <tr>
            <th>
                Text
            </th>            
            <th>
                Tag
            </th>
            <th>
                Probability
            </th>
            </tr>
            {res.map((ele) => (
                
      <tr className="table-row">
          <td>
              {ele.Text}
          </td>
          <td>
              {ele.PartOfSpeech.Tag}
          </td>
          <td>
              {(ele.PartOfSpeech.Score * 100).toFixed(2) + "%"}
          </td>
      </tr>))
      }
        </table>
    )
}


export default SyntaxTokensTable;