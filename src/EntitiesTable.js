import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'

const EntitiesTable = ({ result }) => {

    const res = result.Entities ? result.Entities : [];
    return (
        <Table striped bordered hover responsive="sm">
            <thead>
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
            </thead>
            <tbody>
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
            </tbody>
        </Table>
    )
}


export default EntitiesTable;