import React, { useEffect } from "react";
import {getAccessToken, kakaoLogin, kakaoRedirect} from "../services/apiService";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo.jpeg";
import "../css/LoginPage.css";
import {fetchData} from "./fetchData";


function LoginPage() {
    const navigate = useNavigate();

    const handleKakaoLogin = async () => {
        try {
            const result = await kakaoLogin();
            if (result.success) {
                window.location.href = result.data.url;
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
            <h2>Login</h2>
            <button className="kakao-login-button" onClick={handleKakaoLogin}>
                <img
                    src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
                    alt="kakao-logo"
                />
                Kakao Login
            </button>
        </div>
    );
}

export default LoginPage;