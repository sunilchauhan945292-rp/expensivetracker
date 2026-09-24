import "./Dashboard.css";
import DashboardCards from "./DashBoardCards";
import MonthlyChart from "./MonthlyChart";
import CategoryPieChart from "./CategoryPieChart";
import IncomeExpenseChart from "./IncomeExpenseChart";
import Insights from "./Insights";
import RecentActivity from "./RecentActivity";

// balance, totalIncome, totalExpenses: headline numbers (already computed in App)
// recentTransactions: last 5 transactions, sorted newest-first (already computed in App)


function Dashboard({ balance, totalIncome, totalExpenses, recentTransactions,transactions }) {
  return (
    <div className="dashboard">

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <span className="dashboard-badge">OVERVIEW</span>
          <h2>Dashboard</h2>
          <p>Track your balance, income, and spending at a glance.</p>
        </div>

        <div className="dashboard-icon">₹</div>
      </div>

      {/* Summary cards */}
      <DashboardCards

          balance={balance}

          totalIncome={totalIncome}

          totalExpenses={totalExpenses}

          totalTransactions={recentTransactions.length}

      />
      <MonthlyChart
         transactions={transactions}
      />

      <div className="charts-grid">

          <CategoryPieChart
              transactions={transactions}
          />

          <IncomeExpenseChart
              transactions={transactions}
          />

      </div>
      <Insights
          transactions={transactions}
      />

      <RecentActivity
          transactions={transactions}
      />      

    </div>
  );
}

export default Dashboard;