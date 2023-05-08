import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDiary } from "../services/apiService";
import Footer from "./Footer";
import "../css/DiaryRead.css";

function DiaryRead() {
    const [diaryData, setDiaryData] = useState(null);
    const { diaryId } = useParams();

    useEffect(() => {
        const fetchDiary = async () => {
            const data = await getDiary(diaryId);
            console.log("Fetched diary:", data);
            setDiaryData(data);
        };
        fetchDiary();
    }, [diaryId]);

    const getChecklistItems = (checklistStr) => {
        return checklistStr.split('\n');
    };

    return (
        <div className="diary-read">
            {diaryData ? (
                <>
                    <div className="header">
                        <h2>{diaryData.data.dream_name}</h2>
                        <hr />
                    </div>
                    <div className="image-container">
                        <img src={diaryData.data.image_url} alt={diaryData.data.dream_name} />
                        <div className="public-checkbox-container">
                            <input type="checkbox" className="public-checkbox" checked={diaryData.data.is_public} readOnly />
                            <label>공개</label>
                        </div>
                    </div>
                    <div className="icons">
                        <span className="like">❤️ {diaryData.data.like_count}</span>
                        <span className="view">👁️ {diaryData.data.view_count}</span>
                    </div>
                    <div className="content">
                        <p className="dream">{diaryData.data.dream}</p>
                        <p className="resolution">{diaryData.data.resolution}</p>
                        <ol className="checklist">
                            {getChecklistItems(diaryData.data.checklist).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ol>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <Footer />
        </div>
    );
}

export default DiaryRead;
