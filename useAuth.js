import { useNavigate } from "react-router-dom";

export default function useAuth() {

    const navigate = useNavigate();

    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch {
            return null;
        }
    })();

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });

    }

    function isAuthenticated() {
        return !!localStorage.getItem("token");
    }

    return {
        user,
        logout,
        isAuthenticated,
    };
}