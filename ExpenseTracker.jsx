
import { useRef, useState } from "react";

import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Filters from "../components/Filters";
import Dashboard from "../components/Dashboard";

import useTransactions from "../hooks/useTransactions";
import useAuth from "../hooks/useAuth";

import "./ExpenseTracker.css";

const CATEGORIES = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Education",
    "Entertainment",
    "Salary",
    "Other",
];

function ExpenseTracker() {

    const {
        transactions,
        loading,
        error,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    } = useTransactions();

    const { user, logout } = useAuth();

    const transactionFormRef = useRef(null);

    const [editingTransaction, setEditingTransaction] =
        useState(null);

    const [filterType, setFilterType] = useState("all");
    const [filterCategory, setFilterCategory] =
        useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    function handleEdit(transaction) {

        setEditingTransaction(transaction);

        setTimeout(() => {
            transactionFormRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }, 0);
    }

    async function handleFormSubmit(formData) {

        if (editingTransaction) {

            await updateTransaction(
                editingTransaction._id,
                formData
            );

            setEditingTransaction(null);

        } else {

            await addTransaction(formData);
        }
    }

    const filteredTransactions = transactions.filter((t) => {

        const matchesType =
            filterType === "all" ||
            t.type === filterType;

        const matchesCategory =
            filterCategory === "all" ||
            t.category === filterCategory;

        const matchesSearch =
            t.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        return (
            matchesType &&
            matchesCategory &&
            matchesSearch
        );
    });

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance =
        totalIncome - totalExpenses;

    const recentTransactions = [...transactions]
        .sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        )
        .slice(0, 5);

    if (loading) {
        return (
            <div
                style={{
                    textAlign: "center",
                    marginTop: "100px",
                    fontSize: "20px",
                }}
            >
                Loading transactions...
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    color: "red",
                    textAlign: "center",
                    marginTop: "100px",
                }}
            >
                {error}
            </div>
        );
    }

    return (
        <div className="app">

            <header className="app-header">

                <div className="header-content">

                    <div className="brand">

                        <div className="brand-icon">
                            ₹
                        </div>

                        <div>
                            <h1>Expense Tracker</h1>
                            <p>Manage your money smarter</p>
                        </div>

                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >

                        <div className="header-status">

                            <span className="status-dot"></span>

                            <span>
                                {transactions.length}{" "}
                                {transactions.length === 1
                                    ? "transaction"
                                    : "transactions"}
                            </span>

                        </div>

                        <span
                            style={{
                                color: "#000",
                                fontWeight: "600",
                            }}
                        >
                            Hi {user?.name}
                        </span>

                        <button
                            className="logout-btn"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </header>

            <main className="app-main">

                <Dashboard
                    balance={balance}
                    totalIncome={totalIncome}
                    totalExpenses={totalExpenses}
                    recentTransactions={recentTransactions}
                    transactions={transactions}
                />

                <div
                    ref={transactionFormRef}
                    style={{
                        scrollMarginTop: "100px",
                    }}
                >

                    <TransactionForm
                        editingTransaction={editingTransaction}
                        onSubmit={handleFormSubmit}
                        onCancelEdit={() =>
                            setEditingTransaction(null)
                        }
                    />

                </div>

                <Filters
                    filterType={filterType}
                    filterCategory={filterCategory}
                    searchTerm={searchTerm}
                    onFilterTypeChange={setFilterType}
                    onFilterCategoryChange={setFilterCategory}
                    onSearchChange={setSearchTerm}
                />

                <div className="results-info">

                    <div>

                        <span className="results-label">
                            Showing
                        </span>

                        <strong>
                            {filteredTransactions.length}
                        </strong>

                        <span>
                            {filteredTransactions.length === 1
                                ? " transaction"
                                : " transactions"}
                        </span>

                    </div>

                    {filteredTransactions.length !==
                        transactions.length && (

                        <span className="filtered-text">
                            of {transactions.length} total
                        </span>

                    )}

                </div>

                <TransactionList
                    transactions={filteredTransactions}
                    onDelete={deleteTransaction}
                    onEdit={handleEdit}
                />

            </main>

            <footer className="app-footer">

                <p>
                    Expense Tracker • Your data is securely stored
                    in MongoDB
                </p>

            </footer>

        </div>
    );
}

export default ExpenseTracker;
export { CATEGORIES };