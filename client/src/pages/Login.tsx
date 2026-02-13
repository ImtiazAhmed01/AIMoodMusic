import { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
            email,
            password
        });

        login(res.data.token);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="bg-gray-900 p-8 rounded-xl w-96">
                <h2 className="text-2xl mb-4">Login</h2>

                <input
                    className="w-full mb-3 p-2 bg-gray-800 rounded"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full mb-4 p-2 bg-gray-800 rounded"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-green-600 p-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
