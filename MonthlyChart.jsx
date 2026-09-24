import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function MonthlyChart({ transactions }) {

    const monthlyData = {};

    transactions.forEach((transaction) => {

        if (transaction.type !== "expense") return;

        const month = new Date(transaction.date)
            .toLocaleString("default", {
                month: "short",
            });

        monthlyData[month] =
            (monthlyData[month] || 0) +
            transaction.amount;

    });

    const chartData = Object.entries(monthlyData).map(
        ([month, amount]) => ({
            month,
            amount,
        })
    );

    return (
        <div className="chart-card">

            <h3>Monthly Expenses</h3>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip
                        formatter={(value) => [`₹${value}`, "Expenses"]}
                    />

                    <Bar
    dataKey="amount"
    fill="#2563eb"
    radius={[12, 12, 0, 0]}
    animationDuration={1000}
/>

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default MonthlyChart;