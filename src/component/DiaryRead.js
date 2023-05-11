import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getDiary, updatePublicStatus, editDiary, addComment, getCommentList } from "../services/apiService";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import "../css/DiaryRead.css";

function DiaryRead() {
    const [diaryData, setDiaryData] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({ dream_name: "", dream: "" });
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [more, setMore] = useState(true);

    const { diaryId } = useParams();

    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const clientHeight = document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            setPageNum(prevPageNum => prevPageNum + 1);
        }
    }, []);

    useEffect(() => {
        const fetchDiaryAndComments = async () => {
            const diaryData = await getDiary(diaryId);
            console.log("Fetched diary:", diaryData);
            setDiaryData(diaryData);
            setIsPublic(diaryData.data.is_public);
            setEditData({ dream_name: diaryData.data.dream_name, dream: diaryData.data.dream });

            const commentData = await getCommentList(diaryId, pageNum);
            console.log("Fetched comments:", commentData);

            if (commentData.data.length === 0) {
                setMore(false);
            }
            setComments(prevComments => [...prevComments, ...commentData.data])

            console.log(comments);
            window.addEventListener('scroll', handleScroll);
        };
        if (more){
            fetchDiaryAndComments();
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [diaryId, pageNum, handleScroll]);


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
        const updatedDiary = await getDiary(diaryId);
        setDiaryData(updatedDiary);
    };

    const handleChange = (e) => {
        setEditData({...editData, [e.target.name]: e.target.value});
    };

    const getChecklistItems = (checklistStr) => {
        return checklistStr.split('\n');
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddComment = async () => {
        const newComment = await addComment(diaryId, { comment: comment });
        setComments([...comments, newComment]);
        setComment('');
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
            <div className="comment-section">
                <h3>Comments</h3>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>{comment.comment}</li>
                    ))}
                </ul>
                <div className="add-comment">
                    <input
                        type="text"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Add a comment..."
                    />
                    <button onClick={handleAddComment}>Post Comment</button>
                </div>
            </div>
        </div>

    );
}

export default DiaryRead;

