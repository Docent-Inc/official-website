import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDiary, updatePublicStatus, editDiary } from "../services/apiService";
import { AiFillEdit, AiFillSave } from "react-icons/ai"; // Importing icons from react-icons
import Footer from "./Footer";
import "../css/DiaryRead.css";


function DiaryRead() {
    const [diaryData, setDiaryData] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({ dream_name: "", dream: "" });
    const { diaryId } = useParams();

    useEffect(() => {
        const fetchDiary = async () => {
            const data = await getDiary(diaryId);
            console.log("Fetched diary:", data);
            setDiaryData(data);
            setIsPublic(data.data.is_public);
            setEditData({ dream_name: data.data.dream_name, dream: data.data.dream });
        };
        fetchDiary();
    }, [diaryId]);

    const handlePublicStatusChange = async () => {
        const newPublicStatus = !isPublic;
        setIsPublic(newPublicStatus);

        await updatePublicStatus(diaryId, newPublicStatus);
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        setEditMode(false);
        await editDiary(diaryId, editData);

        // 수정된 다이어리를 다시 불러옵니다.
        const updatedDiary = await getDiary(diaryId);
        setDiaryData(updatedDiary);
    };


    const handleChange = (e) => {
        setEditData({...editData, [e.target.name]: e.target.value});
    };

    const getChecklistItems = (checklistStr) => {
        return checklistStr.split('\n');
    };

    return (
        <div className="diary-read">
            {diaryData ? (
                <>
                    <div className="header">
                        {diaryData.data.is_owner && (
                            <button className="edit-button" onClick={editMode ? handleSaveClick : handleEditClick}>
                                {editMode ? < AiFillSave /> : <AiFillEdit />}
                            </button>
                        )}
                        {editMode ? (
                            <input type="text" name="dream_name" className="edit-input" value={editData.dream_name} onChange={handleChange} />
                        ) : (
                            <h2>{diaryData.data.dream_name}</h2>
                        )}

                        <hr />
                    </div>
                    <div className="image-container">
                        <img src={diaryData.data.image_url} alt={diaryData.data.dream_name} />
                    </div>

                    <div className="icons">
                        <span className="like">❤️ {diaryData.data.like_count}</span>
                        <span className="view">👁️ {diaryData.data.view_count}</span>
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
                    <div className="content">
                        {!isPublic && <p className="private-diary">비공개 게시물 입니다.</p>}
                        {editMode ? (
                            <textarea className="save-input" name="dream" value={editData.dream} onChange={handleChange} />
                        ) : (
                            <p className="dream">{diaryData.data.dream}</p>
                        )}
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
            {editMode && (
                <button className="save-button" onClick={handleSaveClick}>
                    <AiFillSave /> Save
                </button>
            )}
            <Footer />
        </div>
    );
}

export default DiaryRead;

