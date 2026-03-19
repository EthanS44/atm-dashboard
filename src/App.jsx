import Sidebar from './components/Sidebar'
import FilterBar from './components/FilterBar'
import {useState, useEffect} from 'react'
import {getAtmList, getAidList, getTransactions} from "./services/api";
import TransactionTable from "./components/TransactionTable";

function App() {
    const [atmList, setAtmList] = useState([])
    const [aidList, setAidList] = useState([])
    const [transactions, setTransactions] = useState([])
    const [currentPage, setCurrentPage] = useState('transactions')

    const handleSearch = (filters) => {
        getTransactions({ ...filters, atmList }).then(data => {
            setTransactions(data.txn)
        })
    }

    useEffect(() => {
        getAtmList().then(data => setAtmList(data))
        getAidList().then(data => setAidList(data))
    }, [])

    return (
        <div className="app-layout">
            <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
            <div className="main-content">
                {currentPage === 'transactions' ? (
                    <>
                        <div className="transactions-header">
                            <h1>All Transactions</h1>
                            <div>
                                <button onClick={() => alert('Not Implemented')}>Print</button>
                                <button onClick={() => alert('Not Implemented')}>Export</button>
                            </div>
                        </div>
                        <FilterBar atmList={atmList} aidList={aidList} onSearch={handleSearch} />
                        <TransactionTable transactions={transactions} />
                    </>
                ) : (
                    <h2 className="not-implemented">Not Implemented</h2>
                )}
            </div>
        </div>
    )
}

export default App
