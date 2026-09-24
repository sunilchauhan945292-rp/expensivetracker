function DashboardCards({
    balance,
    totalIncome,
    totalExpenses,
    totalTransactions,
}) {

    const cards = [
        {
            title: "Balance",
            value: balance,
            icon: "💰",
            color: "#2563eb",
        },
        {
            title: "Income",
            value: totalIncome,
            icon: "📈",
            color: "#16a34a",
        },
        {
            title: "Expenses",
            value: totalExpenses,
            icon: "📉",
            color: "#dc2626",
        },
        {
            title: "Transactions",
            value: totalTransactions,
            icon: "🧾",
            color: "#9333ea",
        },
    ];

    return (
        <div className="dashboard-cards">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="dashboard-card"
                >

                    <div
                        className="card-icon"
                        style={{
                            background: card.color,
                        }}
                    >
                        {card.icon}
                    </div>

                    <div>

                        <h4>{card.title}</h4>

                        <h2
                                style={{
                                    color:
                                        card.title === "Income"
                                            ? "#16a34a"
                                            : card.title === "Expenses"
                                            ? "#dc2626"
                                            : "#111827",
                                }}
                            >
                                {card.title === "Transactions"
                                    ? card.value
                                    : `₹${card.value.toFixed(2)}`}
                            </h2>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default DashboardCards;