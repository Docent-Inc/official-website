import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getDiary } from "../services/apiService";

function DiaryRead() {
    const [diary, setDiary] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiary = async () => {
            try {
                const diaryData = await getDiary(id);
                setDiary(diaryData);
            } catch (error) {
                console.error('Error fetching Diary Read:', error);
            }
        };
        fetchDiary();
    }, [id]);

    const handleShare = useCallback(() => {
        navigator.clipboard.writeText(window.location.href);
        alert("공유 링크가 복사되었습니다!");
    }, []);

    if (!diary) {
        return <div>Loading...</div>;
    }

    return (
        <div className="diary-read">
            <head className="diary-read-header">
            </head>
            <div className="diary-read-container">
                <div className="diary-read-content">
                    <div className="diary-read-title">
                        <h3>{diary.dream_name}</h3>
                    </div>
                    <div className="diary-read-image">
                        <img src={diary.image_url} alt={diary.dream_name}/>
                    </div>
                    <div className="diary-read-text">
                        <p>{diary.resolution}</p>
                        <p>{diary.checklist}</p>
                    </div>
                </div>
            </div>
            <footer>
                <div className="diary-read-footer">
                    <button onClick={() => navigate('/')}>꿈 그리기</button>
                    <button onClick={handleShare}>공유하기</button>
                </div>
            </footer>
        </div>
    );
}

export default DiaryRead;
