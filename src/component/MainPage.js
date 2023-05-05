import React, { useEffect, useState } from "react";
import { getDiaryList, likeDiary, unlikeDiary } from "../services/apiService";
import logo from "../image/logo.jpeg";
import "../css/MainPage.css";

function MainPage() {
    const [diaryList, setDiaryList] = useState([]);

    useEffect(() => {
        const fetchDiaryList = async () => {
            const diary = await getDiaryList(1);
            console.log("Fetched diary list:", diary);

            if (diary.success) {
                setDiaryList(diary.data);
            }


        };
        // console.log("diaryID:", diary.id);
        fetchDiaryList();
    }, []);

    const accessToken = localStorage.getItem("access_token");

    const handleLikeClick = async (diaryId, isLiked) => {
        if (isLiked) {
            await unlikeDiary(accessToken, diaryId);
        } else {
            await likeDiary(accessToken, diaryId);
        }

        // 좋아요 상태 변경 후 게시물 목록 다시 불러오기
        const diary = await getDiaryList(1);
        if (diary.success) {
            setDiaryList(diary.data);
        }
        if (diary.success) {
            const updatedDiaryList = diary.data.map((item) => {
                return { ...item, isLiked: item.is_liked };
            });
            setDiaryList(updatedDiaryList);
        }
    };

    return (

        <div>
            <header className="header">
                <img src={logo} alt="DOCENT Logo" className="logo" />
            </header>
            <div className="container">
                {diaryList.map((diary) => (
                    <div key={diary.id} className="diary-list-item">
                        <img
                            src={diary.image_url}
                            alt={diary.dream_name}
                        />
                        <div className={"buttons-container"}>
                            <button
                                onClick={() => {
                                    handleLikeClick(diary.id, diary.isLiked);
                                }}
                            >
                                {diary.isLiked ? "❤️" : "🤍"} {diary.like_count}
                            </button>

                            <button>💬 {diary.comment_count}</button>
                        </div>

                        <p>{diary.dream_name}</p>

                    </div>
                ))}
            </div>

            <div className="footer">
                <button>🏠</button>
                <button>➕</button>
                <button>👤</button>
            </div>
        </div>
    );
}

export default MainPage;
