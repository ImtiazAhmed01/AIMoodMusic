import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import type { JSX } from "react/jsx-runtime";

interface Props {
    children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}