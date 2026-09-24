import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = [
    "#3B82F6",
    "#22C55E",
    "#F97316",
    "#EF4444",
    "#8B5CF6",
    "#14B8A6",
    "#EAB308",
    "#EC4899",
];
function CategoryPieChart({ transactions }) {

    const categoryData = {};

    transactions.forEach((transaction) => {

        if (transaction.type !== "expense") return;

        categoryData[transaction.category] =
            (categoryData[transaction.category] || 0)
            + transaction.amount;

    });

    const chartData = Object.entries(categoryData).map(
        ([category, amount]) => ({
            name: category,
            value: amount,
        })
    );

    return (

        <div className="chart-card">

            <h3>Expenses by Category</h3>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        label={({ percent }) =>
                            `${(percent * 100).toFixed(0)}%`
                        }
                    >

                        {chartData.map((entry, index) => (

                            <Cell
                                key={entry.name}
                                fill={
                                    COLORS[
                                        index % COLORS.length
                                    ]
                                }
                            />

                        ))}

                    </Pie>

                    <Tooltip
                        formatter={(value) => [
                            `₹${value}`,
                            "Spent",
                        ]}
                    />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );
}

export default CategoryPieChart;