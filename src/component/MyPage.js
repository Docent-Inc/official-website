import React, { useEffect, useState } from "react";
import { getMyDiaryList } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import "../css/MyPage.css";

function MyPage() {
    const [diaries, setDiaries] = useState([]);
    const navigate = useNavigate();

    const handleGetMyDiaryList = async () => {
        try {
            const result = await getMyDiaryList(1);
            if (result.success) {
                setDiaries(result.data);
            } else {
                alert("일기 목록을 가져오는데 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetMyDiaryList();
    }, []);

    const handleButtonClick = () => {
        navigate("/mypage");
    };

    return (
        <div className="mypage-container">
            <h1>MyPage</h1>
            <div className="image-grid">
                {diaries.map((diary) => (
                    <div key={diary.id} className="image-item">
                        <img src={diary.image_url} alt={diary.dream_name} />
                    </div>
                ))}
            </div>
            <div className="footer">
                <button>🏠</button>
                <button>➕</button>
                <button onClick={handleButtonClick}>👤</button>
            </div>
        </div>
    );
}

export default MyPage;
