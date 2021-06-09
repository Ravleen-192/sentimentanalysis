import React, {useState} from 'react';

const SentimentTable = ({result}) => {

    const res = result;
    return(
        <div>
        Sentiment : {result.Sentiment}
        <table>
            <tr>
            <th>
                Mixed
            </th>
            <th>
                Negative
            </th>
            <th>
                Neutral
            </th>
            <th>
                Positive
            </th>
            </tr>

                
      <tr className="table-row">

          <td>
              {(result.SentimentScore.Mixed * 100).toFixed(2) + "%"}
          </td>
          <td>
              {(result.SentimentScore.Negative * 100).toFixed(2) + "%"}
          </td>
          <td>
              {(result.SentimentScore.Neutral * 100).toFixed(2) + "%"}
          </td>
          <td>
              {(result.SentimentScore.Positive * 100).toFixed(2) + "%"}
          </td>

      </tr>
      
        </table>
        </div>
    )
}


export default SentimentTable;