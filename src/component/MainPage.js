import React, { useEffect, useState } from "react";
import { getDiaryList } from "../services/apiService";
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
                            <button>❤️ {diary.like_count}</button>
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
