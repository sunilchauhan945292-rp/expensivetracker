import { useState, useEffect } from "react";
import { CATEGORIES } from "../pages/ExpenseTracker";
import "./TransactionForm.css";

function TransactionForm({ editingTransaction, onSubmit, onCancelEdit }) {
    const emptyForm = {
        title: "",
        amount: "",
        type: "expense",
        category: CATEGORIES[0],
        date: "",
        note: "",
    };

    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState("");

    useEffect(() => {
        if (editingTransaction) {
            setForm({
                title: editingTransaction.title,
                amount: String(editingTransaction.amount),
                type: editingTransaction.type,
                category: editingTransaction.category,
                date: editingTransaction.date,
                note: editingTransaction.note,
            });
        } else {
            setForm(emptyForm);
        }
    }, [editingTransaction]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!form.title.trim()) {
            setError("Title is required.");
            return;
        }

        if (!form.amount || Number(form.amount) <= 0) {
            setError("Amount must be grater than 0.");
            return;
        }

        if (!form.date) {
            setError("Date is required.");
            return;
        }

        setError("");
        onSubmit(form);
        setForm(emptyForm);
    }

    return (
        <form className="transaction-form" onSubmit={handleSubmit}>

            <div className="form-header">
                <div>
                    <span className="form-badge">
                        {editingTransaction ? "EDIT MODE" : "NEW TRANSACTION"}
                    </span>

                    <h2>
                        {editingTransaction
                            ? "Edit Transaction"
                            : "Add Transaction"}
                    </h2>

                    <p>
                        {editingTransaction
                            ? "Update the details of your transaction."
                            : "Record your income and expenses easily."}
                    </p>
                </div>

                <div className="form-icon">
                    {editingTransaction ? "✎" : "+"}
                </div>
            </div>

            {error && (
                <div className="error-message">
                    <span>!</span>
                    {error}
                </div>
            )}

            <div className="form-group">
                <label>Title</label>

                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Groceries"
                />
            </div>

            <div className="form-group">
                <label>Amount</label>

                <div className="amount-input">
                    <span>₹</span>

                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                    />
                </div>
            </div>

            <div className="form-row">

                <div className="form-group">
                    <label>Type</label>

                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Category</label>

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            <div className="form-group">
                <label>Date</label>

                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>
                    Note <span>(optional)</span>
                </label>

                <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    placeholder="Add any extra details..."
                    rows="3"
                />
            </div>

            <div className="form-actions">

                <button className="submit-btn" type="submit">
                    {editingTransaction
                        ? "Save Changes"
                        : "Add Transaction"}
                </button>

                {editingTransaction && (
                    <button
                        className="cancel-btn"
                        type="button"
                        onClick={onCancelEdit}
                    >
                        Cancel
                    </button>
                )}

            </div>

        </form>
    );
}

export default TransactionForm;









