import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../services/apiService";
import "../css/Callback.css";

function Callback() {
    const navigate = useNavigate();
    const handleLogin = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            const result = await getAccessToken(code);
            if (result && result.success) {
                // 로그인 성공
                console.log('result:', result);
                // localStorage.setItem("access_token", result.access_token);
                // localStorage.setItem("refresh_token", result.refresh_token);
                // localStorage.setItem("user_email", result.user_email);
                //
                // const token = localStorage.getItem("access_token");
                //
                // console.log('callbacktoken:', token);
                navigate("/godmorning");
            } else {
                // 로그인 실패
                alert("로그인에 실패했습니다. 다시 시도해주세요.");
                navigate("/");
            }
        } else {
            alert("인증 코드를 찾을 수 없습니다. 다시 시도해주세요.");
            navigate("/");
        }
    }

    useEffect(() => {
        console.log('Callback');
        handleLogin();
    }, []);

    return (
        <div className={"processing-container"}>
            <span className={"processing-text"}>
                로그인 처리 중
                <span className={"dot"}>.</span>
                <span className={"dot"}>.</span>
                <span className={"dot"}>.</span>
            </span>

        </div>
    );
}

export default Callback;