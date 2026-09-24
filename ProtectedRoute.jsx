import {Navigate} from "react-router-dom";

function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (!payload.exp) return false;
        // exp is in seconds; Date.now() is in ms
        return Date.now() >= payload.exp * 1000;
    } catch {
        // malformed token, treat as expired/invalid
        return true;
    }
}

function ProtectedRoute({children}){
    const token=localStorage.getItem("token");

    if(!token || isTokenExpired(token)){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return <Navigate to="/login" replace/>;

    }

    return children;
}

export default ProtectedRoute;