import React, {useEffect, useState} from "react";
import {getAccessToken, getUserCount, kakaoLogin, kakaoRedirect} from "../services/apiService";
import { useNavigate } from "react-router-dom";
import logo from "../image/newLogo.png";
import kakaoLogo from "../image/kakao_login_large_narrow.png";
import jelly from '../image/jellyVideo.gif';
import "../css/LoginPage.css";
import BackButton from './BackButton';

function LoginPage() {
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState(null);

    useEffect(() => {
        const fetchCounts = async () => {
            const userCount = await getUserCount();
            setUserCount(userCount);
        };
        fetchCounts();
    }, []);

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
            <BackButton />
            <header className="login-header">
                <img src={logo} alt="DOCENT Logo" className="logo" />
            </header>
            <div className="login-main">
                <img className="jelly" src={jelly} alt="jelly"/>
            </div>
            <button className="kakao-login-button" onClick={handleKakaoLogin}>
                <img
                    src={kakaoLogo}
                    alt="kakao-logo"
                />
            </button>
            <div className="login-footer">
                <p><strong>지금까지 {userCount}명이 가입했어요!</strong></p>
            </div>
        </div>
    );
}

export default LoginPage;