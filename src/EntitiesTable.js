import React, {useState} from 'react';


const EntitiesTable = ({result}) => {

    const res = result.Entities ? result.Entities : [];
    return(
        <table>
            <tr>
            
            <th>
                Text
            </th>
            <th>
                Type
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
              {ele.Type}
          </td>
          <td>
              {(ele.Score * 100).toFixed(2) + "%"}
          </td>
      </tr>))
      }
        </table>
    )
}


export default EntitiesTable;