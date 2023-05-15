import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { getDiary } from "../services/apiService";
import logo3 from "../image/docentLogo3.png";
import '../css/DiaryRead.css';

function DiaryRead() {
    const [diary, setDiary] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // 토글 상태
    const location = useLocation();
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
        const shareLink = window.location.origin + location.pathname;
        navigator.clipboard.writeText(shareLink);
        alert("공유 링크가 복사되었습니다!");
    }, [location]);

    const handleToggle = () => {
        setIsOpen(!isOpen); // 토글 상태 변경
    }

    if (!diary) {
        return <div>Loading...</div>;
    }

    return (
        <div className="diary-read">
            <img className="logo3" src={logo3} alt="logo" />
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
                    <div className={`diary-read-text ${isOpen ? 'open' : ''}`}>
                        <button className="toggle" onClick={handleToggle}>내용 보기</button>
                        {isOpen && (
                            <>
                                <p>{diary.dream}</p>
                                <p>{diary.resolution}</p>
                                {diary.checklist.split('\n').map((item, index) => (
                                    <p key={index}>{item}</p>
                                ))}
                            </>
                        )}
                    </div>

                </div>
            </div>
            <footer>
                <div className="diary-read-footer">
                    <button className="nvi-draw" onClick={() => navigate('/')}>꿈 그리기</button>
                    <button className="share" onClick={handleShare}>공유하기</button>
                </div>
            </footer>
        </div>
    );
}

export default DiaryRead;
