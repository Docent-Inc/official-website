import React, { useState } from "react";
import { registerUser } from "../services/apiService";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        const response = await registerUser(email, username, nickname, password);
        // Handle registration response (e.g., show success message, redirect to login page, etc.)
    };

    return (
        <div>
            <h2>Register</h2>
            <form>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Nickname:</label>
                    <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="button" onClick={handleRegister}>Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
