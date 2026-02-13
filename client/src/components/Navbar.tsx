import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>AI Music Therapy</div>

            <div style={styles.links}>
                {user && (
                    <>
                        <Link to="/" style={styles.link}>Home</Link>
                        <Link to="/profile" style={styles.link}>Profile</Link>
                    </>
                )}

                {!user && (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.link}>Register</Link>
                    </>
                )}

                {user && (
                    <button onClick={handleLogout} style={styles.button}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 40px",
        background: "#111",
        color: "white",
        alignItems: "center"
    },
    logo: {
        fontWeight: "bold",
        fontSize: "18px"
    },
    links: {
        display: "flex",
        gap: "20px",
        alignItems: "center"
    },
    link: {
        color: "white",
        textDecoration: "none"
    },
    button: {
        padding: "6px 12px",
        background: "#444",
        color: "white",
        border: "none",
        cursor: "pointer"
    }
};
