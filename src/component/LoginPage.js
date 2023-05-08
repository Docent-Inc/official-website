import React, { useEffect } from "react";
import {getAccessToken, kakaoLogin, kakaoRedirect} from "../services/apiService";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo.jpeg";
import kakaoLogo from "../image/kakao_login_large_narrow.png";
import "../css/LoginPage.css";

function LoginPage() {
    const navigate = useNavigate();

    const handleKakaoLogin = async () => {
        try {
            const result = await kakaoLogin();
            if (result.success) {
                window.location.href = result.data.url;
                console.log('result:', result);
            } else {
                alert("로그인에 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="login-container">
            <img src={logo} alt="DOCENT Logo" className="logo" />
            <button className="kakao-login-button" onClick={handleKakaoLogin}>
                <img
                    src={kakaoLogo}
                    alt="kakao-logo"
                />
            </button>
        </div>
    );
}

export default LoginPage;
