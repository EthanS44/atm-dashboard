function Sidebar({ setCurrentPage, currentPage }) {
    return (
        <div className="sidebar">
            <p
                className={`sidebar-item ${currentPage === 'transactions' ? 'active' : ''}`}
                onClick={() => setCurrentPage('transactions')}
            >Transactions</p>
            <p
                className={`sidebar-item ${currentPage === 'settings' ? 'active' : ''}`}
                onClick={() => setCurrentPage('settings')}
            >Settings</p>
            <ul className="sidebar-subitems">
                <li onClick={() => setCurrentPage('userManagement')}>User Management</li>
                <li onClick={() => setCurrentPage('atmManagement')}>ATM Management</li>
                <li onClick={() => setCurrentPage('myAccount')}>My Account</li>
            </ul>
        </div>
    )
}

export default Sidebar