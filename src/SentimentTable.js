import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'
import './App.css';

const SentimentTable = ({ result }) => {

    const res = result;
    return (
        <div>
            Sentiment : {result.Sentiment}
            <Table striped bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mixed</th>
                        <th>Negative</th>
                        <th>Neutral</th>
                        <th>Positive</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{(result.SentimentScore.Mixed * 100).toFixed(2) + "%"}</td>
                        <td>{(result.SentimentScore.Negative * 100).toFixed(2) + "%"}</td>
                        <td>{(result.SentimentScore.Neutral * 100).toFixed(2) + "%"}</td>
                        <td>{(result.SentimentScore.Positive * 100).toFixed(2) + "%"}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}


export default SentimentTable;