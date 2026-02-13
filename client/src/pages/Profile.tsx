import { useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

export default function Profile() {
    const [profile, setProfile] = useState<any>(null);
    const [history, setHistory] = useState<any[]>([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setProfile(res.data));

        axios.get("http://localhost:5000/api/history", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setHistory(res.data));
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl mb-6">Your Profile</h1>

            <div className="bg-gray-900 p-6 rounded-xl mb-8">
                <p>Name: {profile.name}</p>
                <p>Email: {profile.email}</p>
                <p>Primary Mood: {profile.profile.primaryMood}</p>
                <p>Preferred Style: {profile.profile.preferredStyle}</p>
            </div>

            <h2 className="text-xl mb-4">📈 Emotional Trend</h2>

            <LineChart width={600} height={300} data={history}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="stress" stroke="#ff4d4d" />
                <Line type="monotone" dataKey="energy" stroke="#4dff88" />
            </LineChart>
        </div>
    );
}
