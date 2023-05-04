import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoRedirect } from "../services/apiService";

function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccessToken = async () => {
            const url = new URL(window.location.href);
            alert(url);
            // 나머지 로직을 여기에 추가하세요.
        };

        // fetchAccessToken 함수를 호출합니다.
        fetchAccessToken();
    }, []);

    return <h1>Callback</h1>; // 이 부분을 수정했습니다.
}

export default Callback;
