function Insights({ transactions }) {

    const expenses = transactions.filter(
        (t) => t.type === "expense"
    );

    const income = transactions.filter(
        (t) => t.type === "income"
    );

    const totalExpense = expenses.reduce(
        (sum, t) => sum + t.amount,
        0
    );

    const totalIncome = income.reduce(
        (sum, t) => sum + t.amount,
        0
    );

    const balance = totalIncome - totalExpense;

    const averageExpense =
        expenses.length === 0
            ? 0
            : totalExpense / expenses.length;

    const categoryTotals = {};

    expenses.forEach((t) => {

        categoryTotals[t.category] =
            (categoryTotals[t.category] || 0)
            + t.amount;

    });

    let highestCategory = "-";
    let highestAmount = 0;

    Object.entries(categoryTotals).forEach(
        ([category, amount]) => {

            if (amount > highestAmount) {

                highestAmount = amount;
                highestCategory = category;

            }

        }
    );

    const expenseRatio =
        totalIncome === 0
            ? 0
            : (totalExpense / totalIncome) * 100;

    return (

        <div className="insights-container">

            <div className="insights-header">

                <h2>Financial Insights</h2>

                <p>
                    Overview of your spending behaviour
                </p>

            </div>

            <div className="insights-grid">

                <div className="insight-box">

                    <span>Highest Category</span>

                    <h3>{highestCategory}</h3>

                    <small>₹{highestAmount.toFixed(2)}</small>

                </div>

                <div className="insight-box">

                    <span>Net Savings</span>

                    <h3>₹{balance.toFixed(2)}</h3>

                    <small>
                        {balance >= 0
                            ? "Positive"
                            : "Negative"}
                    </small>

                </div>

                <div className="insight-box">

                    <span>Average Expense</span>

                    <h3>
                        ₹{averageExpense.toFixed(2)}
                    </h3>

                    <small>
                        Per transaction
                    </small>

                </div>

                <div className="insight-box">

                    <span>Expense Ratio</span>

                    <h3>
                        {expenseRatio.toFixed(1)}%
                    </h3>

                    <small>
                        Income vs Expense
                    </small>

                </div>

            </div>

            <div className="health-section">

                <div className="health-top">

                    <span>Financial Health</span>

                    <strong>
                        {(100 - expenseRatio).toFixed(0)}%
                    </strong>

                </div>

                <div className="progress">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${Math.max(
                                5,
                                100 - expenseRatio
                            )}%`,
                        }}
                    ></div>

                </div>

                <p className="health-text">

                    {expenseRatio < 60
                        ? "Your spending is well under control."
                        : expenseRatio < 85
                        ? "Your spending is balanced."
                        : "Your expenses are approaching your income. Consider reducing discretionary spending."}

                </p>

            </div>

        </div>

    );
}

export default Insights;