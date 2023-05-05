// MainPage.js
import React, { useEffect, useState } from "react";
import { getDiaryList } from "../services/apiService";
import logo from "../image/logo.jpeg";
import "../css/MainPage.css";

function MainPage() {
    // const [diaryList, setDiaryList] = useState([]);
    //
    // useEffect(() => {
    //     const fetchDiaryList = async () => {
    //         const data = await getDiaryList(1);
    //         setDiaryList(data);
    //     };
    //
    //     fetchDiaryList();
    // }, []);

    return (
        <div>
            <header>
                <img src={logo} alt="DOCENT Logo" className="logo" />
            </header>
            <div className="container">
                {diaryList.map((diary) => (
                    <div key={diary.id} className="post">
                        <div
                            className="image"
                            style={{ backgroundImage: `url(${diary.image})` }}
                        ></div>
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
