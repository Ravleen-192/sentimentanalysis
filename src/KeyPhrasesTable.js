import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'
const KeyPhrasesTable = ({ result }) => {

    const res = result.KeyPhrases ? result.KeyPhrases : [];
    return (
        <div>
        <Table striped bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th>
                            Text
                        </th>
                        <th>
                            Probability
                        </th>
                    </tr>
                </thead>
                
                <tbody>
                {res.map((ele) => (
                    <tr>
                        <td>
                            {ele.Text}
                        </td>
                        <td>
                            {(ele.Score * 100).toFixed(2) + "%"}
                        </td>
                    </tr>))}
                </tbody>
            </Table>
            </div>
    )
        
}


export default KeyPhrasesTable;