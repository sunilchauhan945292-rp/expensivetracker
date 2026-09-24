const API_URL = `${import.meta.env.VITE_API_URL}/transactions`;

function getToken() {
    return localStorage.getItem("token");
}

// If the token is missing/expired/invalid, the backend returns 401.
// Clear the stale session and send the user back to login instead of
// leaving them stuck on a broken dashboard.
function handleAuthError(response) {
    if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return true;
    }
    return false;
}

// ======================
// Get All Transactions
// ======================

export async function getTransactions() {

    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (handleAuthError(response)) {
        return new Promise(() => {}); // redirecting; stop here
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch transactions"
        );
    }

    return data;
}

// ======================
// Add Transaction
// ======================

export async function addTransactionApi(transaction) {

    const response = await fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },

        body: JSON.stringify(transaction),
    });

    if (handleAuthError(response)) {
        return new Promise(() => {}); // redirecting; stop here
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to add transaction"
        );
    }

    return data;
}

// ======================
// Update Transaction
// ======================

export async function updateTransactionApi(id, transaction) {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },

            body: JSON.stringify(transaction),
        }
    );

    if (handleAuthError(response)) {
        return new Promise(() => {}); // redirecting; stop here
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update transaction"
        );
    }

    return data;
}

// ======================
// Delete Transaction
// ======================

export async function deleteTransactionApi(id) {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    if (handleAuthError(response)) {
        return new Promise(() => {}); // redirecting; stop here
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to delete transaction"
        );
    }

    return data;
}