import React, { useState } from 'react'
import { getTransactionLog } from '../services/api'

function formatDevTime(devTime) {
    const s = devTime.toString()
    const year = s.substring(0, 4)
    const month = s.substring(4, 6)
    const day = s.substring(6, 8)
    const hour = s.substring(8, 10)
    const min = s.substring(10, 12)
    const sec = s.substring(12, 14)
    return `${year}/${month}/${day} ${hour}:${min}:${sec}`
}

function formatDate(devTime){
    const s = devTime.toString()
    const year = s.substring(0, 4)
    const month = s.substring(4, 6)
    const day = s.substring(6, 8)
    return `${year}/${month}/${day}`
}

function TransactionTable({ transactions = [] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [expandedRow, setExpandedRow] = useState(null)
    const [logs, setLogs] = useState({})

    const handleRowClick = (txn, index) => {
        if (expandedRow === index) {
            setExpandedRow(null)
        } else {
            setExpandedRow(index)
            if (!logs[index]) {
                getTransactionLog(txn.atm.id, txn.devTime).then(text => {
                    setLogs(prev => ({ ...prev, [index]: text }))
                })
            }
        }
    }

    const filteredTransactions = transactions.filter(txn => {
        const term = searchTerm.toLowerCase()
        return (
            txn.atm?.txt?.toLowerCase().includes(term) ||
            txn.pan?.toLowerCase().includes(term) ||
            txn.ttp?.descr?.toLowerCase().includes(term) ||
            txn.hst?.txt?.toLowerCase().includes(term) ||
            txn.hst?.descr?.toLowerCase().includes(term) ||
            txn.ref?.toLowerCase().includes(term) ||
            txn.amount?.toString().includes(term)
        )
    })

    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>ATM ID</th>
                    <th>Customer PAN</th>
                    <th>Description</th>
                    <th>Code</th>
                    <th>
                        <input
                            type="text"
                            placeholder="Search in results"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </th>
                </tr>
                </thead>
                <tbody>
                {filteredTransactions.map((txn, index) => (
                    <React.Fragment key={index}>
                        <tr
                            onClick={() => handleRowClick(txn, index)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{formatDate(txn.devTime)}</td>
                            <td>{txn.atm?.txt}</td>
                            <td>{txn.pan}</td>
                            <td>
                                {txn.ttp?.descr}<br />
                                {'Amount: $' + txn.amount}<br />
                                {txn.hst?.descr}
                            </td>
                            <td>
                                {formatDevTime(txn.devTime)}<br />
                                {txn.ref ? `Transaction #: ${txn.ref}` : ''}
                            </td>
                            <td style={{ color: '#888' }}>
                                {expandedRow === index ? '▼' : '▶'}
                            </td>
                        </tr>
                        {expandedRow === index && logs[index] && (
                            <tr style={{ backgroundColor: '#f9f9f9' }}>
                                <td colSpan="6">
                                    <p style={{ fontWeight: '600', marginBottom: '8px', fontSize: '12px', color: '#555' }}>
                                        Transaction Log
                                    </p>
                                    <pre style={{ fontSize: '12px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                        {logs[index]}
                                    </pre>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionTable