import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'
const LanguageTable = ({ result }) => {

    const res = result.Languages ? result.Languages : [];
    return (
        <Table striped bordered hover responsive="sm">
            <thead>
                <tr>
                    <th>
                        Language
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
                            {ele.LanguageCode}
                        </td>
                        <td>
                            {(ele.Score * 100).toFixed(2) + "%"}
                        </td>

                    </tr>))
                }
            </tbody>
        </Table>
    )
}


export default LanguageTable;