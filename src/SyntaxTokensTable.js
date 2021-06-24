import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'
const SyntaxTokensTable = ({ result }) => {

    const res = result.SyntaxTokens ? result.SyntaxTokens : [];
    return (
        <Table striped bordered hover responsive="sm">
            <thead>
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
            </thead>
            <tbody>
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
            </tbody>
        </Table>
    )
}


export default SyntaxTokensTable;