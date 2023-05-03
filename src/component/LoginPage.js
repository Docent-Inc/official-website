import React, { useState } from "react";
import { loginUser } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import "../LoginPage.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const result = await loginUser(username, password);
            if (result.success) {
                const { access_token, refresh_token } = result.data;
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("refresh_token", refresh_token);
                // 로그인이 성공적으로 이루어졌으므로 메인 화면으로 이동합니다.
                navigate("/diary-list");
            } else {
                // 로그인에 실패했으므로 에러 메시지를 출력합니다.
                alert("로그인에 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <div className="input-container">
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="login-button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default LoginPage;
