import { useState } from "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";

import "./Auth.css";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!password) {
            setError("Password is required.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        email: email.trim().toLowerCase(),
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {

                setError(
                    data.message || "Login failed."
                );

                return;
            }

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/dashboard");

        } catch (err) {

            console.error(err);

            setError(
                err.message || "Unable to connect to server."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    ₹
                </div>

                <h1>
                    Welcome Back
                </h1>

                <p className="auth-subtitle">
                    Login to manage your expenses
                </p>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="auth-form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            disabled={loading}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="auth-form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            disabled={loading}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        className="auth-button"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"}

                    </button>

                </form>

                <p className="auth-switch">

                    Don't have an account?{" "}

                    <Link to="/signup">
                        Sign Up
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;