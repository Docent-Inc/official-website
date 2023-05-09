import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDiary, updatePublicStatus } from "../services/apiService";
import Footer from "./Footer";
import "../css/DiaryRead.css";

function DiaryRead() {
    const [diaryData, setDiaryData] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    const { diaryId } = useParams();

    useEffect(() => {
        const fetchDiary = async () => {
            const data = await getDiary(diaryId);
            console.log("Fetched diary:", data);
            setDiaryData(data);
            setIsPublic(data.data.is_public);
        };
        fetchDiary();
    }, [diaryId]);

    const handlePublicStatusChange = async () => {
        const newPublicStatus = !isPublic;
        setIsPublic(newPublicStatus);

        await updatePublicStatus(diaryId, newPublicStatus);
    };

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
                        {diaryData.data.is_owner && (
                            <div className="public-status-container">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        className="public-checkbox"
                                        checked={isPublic}
                                        onChange={handlePublicStatusChange}
                                    />
                                    <span className="slider round"></span>
                                </label>
                                <label>{isPublic ? "공개됨" : "비공개됨"}</label>
                            </div>
                        )}
                    </div>
                    <div className="icons">
                        <span className="like">❤️ {diaryData.data.like_count}</span>
                        <span className="view">👁️ {diaryData.data.view_count}</span>
                    </div>
                    <div className="content">
                        {!isPublic && <p className="private-diary">비공개 게시물 입니다.</p>}
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
