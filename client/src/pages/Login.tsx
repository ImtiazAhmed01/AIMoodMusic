import { useState } from "react";
import { login } from "../services/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        await login({ email, password });
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="p-6 bg-gray-900 rounded">
                <h2 className="text-xl mb-4">Login</h2>
                <input
                    className="mb-3 p-2 w-full text-black"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="mb-3 p-2 w-full text-black"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className="bg-blue-600 px-4 py-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
