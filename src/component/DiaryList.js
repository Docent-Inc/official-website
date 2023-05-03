import React, { useEffect, useState } from 'react';
import { getDiaryList } from '../services/apiService';
import './DiaryList.css';

const DiaryList = () => {
    const [diaries, setDiaries] = useState([]);

    useEffect(() => {
        const fetchDiaries = async () => {
            const result = await getDiaryList(1);
            if (result.success) {
                setDiaries(result.data);
            }
        };
        fetchDiaries();
    }, []);

    const handleImageClick = (id) => {
        // 여기에 이미지 클릭 시 상세 페이지로 이동하는 코드를 추가하세요.
        console.log('Image clicked:', id);
    };

    return (
        <div className="diary-list">
            {diaries.map((diary) => (
                <div key={diary.id} className="diary-list-item">
                    <img
                        src={diary.image_url}
                        alt={diary.dream_name}
                        onClick={() => handleImageClick(diary.id)}
                    />
                    <h2>{diary.dream_name}</h2>
                    <p>View count: {diary.view_count}</p>
                    <p>Like count: {diary.like_count}</p>
                    <p>Comment count: {diary.comment_count}</p>
                </div>
            ))}
        </div>
    );
};

export default DiaryList;
