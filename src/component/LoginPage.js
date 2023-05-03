import React, { useState } from "react";
import { loginUser } from "../services/apiService";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const result = await loginUser(username, password);
            console.log(result); // 로그인 결과 출력
        } catch (error) {
            console.error(error.message); // 로그인 실패 시 오류 메시지 출력
        }
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;
