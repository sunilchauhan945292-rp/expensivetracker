import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
} from "recharts";

function IncomeExpenseChart({ transactions }) {

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const data = [
        {
            name: "Income",
            amount: totalIncome,
        },
        {
            name: "Expense",
            amount: totalExpense,
        },
    ];

    return (

        <div className="chart-card">

            <h3>Income vs Expense</h3>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="name"/>

                    <YAxis/>

                    <Tooltip
                        formatter={(value)=>
                            [`₹${value}`, "Amount"]
                        }
                    />

                    <Bar
                        dataKey="amount"
                        radius={[10,10,0,0]}
                    >

                        <Cell fill="#22c55e"/>

                        <Cell fill="#ef4444"/>

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default IncomeExpenseChart;