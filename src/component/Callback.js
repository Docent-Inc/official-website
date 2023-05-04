import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoRedirect } from "../services/apiService";

function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccessToken = async () => {
            const url = new URL(window.location.href);
            alert(url);
            }
        return async () => {
            <h1>Callback</h1>
        }
    }, []);
}

export default Callback;
