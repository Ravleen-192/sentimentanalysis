import React, {useState} from 'react';

const LanguageTable = ({result}) => {

    const res = result.Languages ? result.Languages : [];
    return(
        <table>
            <tr>
            <th>
                Language
            </th>
            <th>
                Probability
            </th>
            </tr>
            {res.map((ele) => (
                
      <tr className="table-row">
          <td>
              {ele.LanguageCode}
          </td>
          <td>
              {(ele.Score * 100).toFixed(2) + "%"}
          </td>

      </tr>))
      }
        </table>
    )
}


export default LanguageTable;