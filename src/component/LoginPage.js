// import React, { useState } from "react";
// import { kakaoLogin } from "../services/apiService";
// import { useNavigate } from "react-router-dom";
// import "../LoginPage.css";
//
//
// function LoginPage() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();
//
//     const handleKakaoLogin = async () => {
//         try {
//             const result = await kakaoLogin();
//             if (result.success) {
//                 // 받아온 URL로 이동
//                 window.location.href = result.data.url;
//             } else {
//                 // 로그인에 실패했으므로 에러 메시지를 출력합니다.
//                 alert("카카오 로그인에 실패했습니다.");
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//
//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <div className="input-container">
//                 <label>Username:</label>
//                 <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//             </div>
//             <div className="input-container">
//                 <label>Password:</label>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </div>
//             <button className="login-button" onClick={handleLogin}>
//                 Login
//             </button>
//         </div>
//     );
// }
//
// export default LoginPage;
import React, { useState } from "react";
import { kakaoLogin } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import "../LoginPage.css";

function LoginPage() {
    const navigate = useNavigate();

    const handleKakaoLogin = async () => {
        try {
            const result = await kakaoLogin();
            if (result.success) {
                // 받아온 URL로 이동
                window.location.href = result.data.url;
            } else {
                // 로그인에 실패했으므로 에러 메시지를 출력합니다.
                alert("카카오 로그인에 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <button className="kakao-login-button" onClick={handleKakaoLogin}>
                Kakao Login
            </button>
        </div>
    );
}

export default LoginPage;
