import "./TransactionList.css";

function TransactionList({ transactions, onDelete, onEdit }) {

    if (transactions.length === 0) {
        return (
            <div className="empty-transactions">
                <div className="empty-icon">↕</div>
                <h3>No transactions yet</h3>
                <p>Add your first transaction above to get started.</p>
            </div>
        );
    }

    return (
        <div className="transaction-list-container">

            <div className="list-header">
                <div>
                    <span className="list-badge">TRANSACTIONS</span>
                    <h2>Recent Transactions</h2>
                    <p>View and manage your income and expenses.</p>
                </div>

                <div className="transaction-count">
                    {transactions.length}
                </div>
            </div>

            <ul className="transaction-list">

                {transactions.map((t) => (

                    <li
                        key={t._id}
                        className={`transaction-item  ${t.type}`}
                    >

                        <div className="transaction-left">

                            <div
                                className={`transaction-type-icon ${t.type}`}
                            >
                                {t.type === "income" ? "↑" : "↓"}
                            </div>

                            <div className="transaction-info">

                                <div className="transaction-title-row">
                                    <strong>{t.title}</strong>

                                    <span className="category">
                                        {t.category}
                                    </span>
                                </div>

                                <div className="transaction-details">

                                    <span>{t.date}</span>

                                    {t.note && (
                                        <>
                                            <span className="dot">•</span>
                                            <span>{t.note}</span>
                                        </>
                                    )}

                                </div>

                            </div>

                        </div>

                        <div className="transaction-right">

                            <span
                                className={`transaction-amount ${t.type}`}
                            >
                                {t.type === "income" ? "+" : "-"}₹
                                {t.amount.toFixed(2)}
                            </span>

                            <div className="transaction-actions">

                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(t)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => onDelete(t._id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </li>

                ))}

            </ul>

        </div>
    );
}

export default TransactionList;