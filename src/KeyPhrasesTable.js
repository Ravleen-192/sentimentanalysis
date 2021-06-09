import React, {useState} from 'react';

const KeyPhrasesTable = ({result}) => {

    const res = result.KeyPhrases ? result.KeyPhrases : [];
    return(
        <table>
            <tr>
            <th>
                Text
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
              {(ele.Score * 100).toFixed(2) + "%"}
          </td>

      </tr>))
      }
        </table>
    )
}


export default KeyPhrasesTable;