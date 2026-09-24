function RecentActivity({ transactions }) {

    const recent = [...transactions]
        .sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        )
        .slice(0, 6);

    return (

        <div className="recent-card">

            <div className="recent-header">

                <h2>Recent Activity</h2>

                <span>
                    {recent.length} Transactions
                </span>

            </div>

            {recent.map((transaction) => (

                <div
                    key={transaction._id}
                    className="recent-item"
                >

                    <div className="recent-left">

                        <div className="activity-dot"></div>

                        <div>

                            <h4>
                                {transaction.title}
                            </h4>

                            <p>

                                {transaction.category}

                                •

                                {" "}

                                {new Date(
                                    transaction.date
                                ).toLocaleDateString()}

                            </p>

                        </div>

                    </div>

                    <div
                        className={
                            transaction.type === "income"
                                ? "income-text"
                                : "expense-text"
                        }
                    >

                        {transaction.type === "income"
                            ? "+"
                            : "-"}

                        ₹

                        {transaction.amount.toFixed(2)}

                    </div>

                </div>

            ))}

        </div>

    );

}

export default RecentActivity;