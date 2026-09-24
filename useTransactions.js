import { useEffect, useState } from "react";
import {
    getTransactions,
    addTransactionApi,
    updateTransactionApi,
    deleteTransactionApi,
} from "../api/transactionApi";

export default function useTransactions() {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadTransactions();
    }, []);

    async function loadTransactions() {
        try {
            setLoading(true);

            const data = await getTransactions();

            setTransactions(data);
        } catch (err) {
            console.error(err);
            setError("Unable to load transactions.");
        } finally {
            setLoading(false);
        }
    }

    async function addTransaction(transaction) {
        try {
            const createdTransaction =
                await addTransactionApi(transaction);

            setTransactions((prev) => [
                createdTransaction,
                ...prev,
            ]);
        } catch (err) {
            console.error(err);
            alert("Unable to add transaction.");
        }
    }

    async function updateTransaction(id, transaction) {
        try {
            const updatedTransaction =
                await updateTransactionApi(id, transaction);

            setTransactions((prev) =>
                prev.map((t) =>
                    t._id === id ? updatedTransaction : t
                )
            );
        } catch (err) {
            console.error(err);
            alert("Unable to update transaction.");
        }
    }

    async function deleteTransaction(id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmed) return;

        try {

            await deleteTransactionApi(id);

            setTransactions((prev) =>
                prev.filter((t) => t._id !== id)
            );

        } catch (err) {

            console.error(err);

            alert("Unable to delete transaction.");
        }
    }

    return {
        transactions,
        loading,
        error,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    };
}