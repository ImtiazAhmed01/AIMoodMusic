import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";

export default function Register() {
    const { login } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleRegister = async () => {
        const res = await axios.post(
            "http://localhost:5000/api/auth/register",
            form
        );

        login(res.data.token);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-black text-white">
            <div className="bg-gray-900 p-8 rounded-xl w-96">
                <h2 className="text-2xl mb-4">Create Account</h2>

                <input
                    placeholder="Name"
                    className="w-full mb-3 p-2 bg-gray-800 rounded"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    placeholder="Email"
                    className="w-full mb-3 p-2 bg-gray-800 rounded"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 p-2 bg-gray-800 rounded"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button
                    onClick={handleRegister}
                    className="w-full bg-green-600 p-2 rounded"
                >
                    Register
                </button>
            </div>
        </div>
    );
}
