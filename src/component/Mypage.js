import React, { useState, useEffect } from 'react';
import { getMyDiaryList } from '../services/apiService';
import '../css/Mypage.css';
import logo2 from "../image/newLogo.png";
import BackButton from './BackButton';
import CreateButton from "./CreateButton";

export default function MyPage() {
    const [diaries, setDiaries] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isOpen, setIsOpen] = useState([]);

    const handleToggle = (index) => {
        setIsOpen(prevIsOpen => {
            const newIsOpen = [...prevIsOpen];
            newIsOpen[index] = !newIsOpen[index];
            return newIsOpen;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMyDiaryList(page);

            if (response.data && response.data.length > 0) {
                setDiaries(prevDiaries => [...prevDiaries, ...response.data]);
                setPage(prevPage => prevPage + 1);
                setIsOpen(prevIsOpen => [...prevIsOpen, ...new Array(response.data.length).fill(false)]);
            } else {
                setHasMore(false);
            }
        };

        if (hasMore) {
            fetchData();
        }
    }, [page, hasMore]);

    return (

        <div className="myDiary">
            <BackButton />
            <CreateButton />
            <div className="myHeader">

                <img className="myLogo" src={logo2} alt="logo" />

            </div>
            {diaries.map((diary, index) => (
                <div className="my-read-container" key={diary.id}>
                    <div className="my-read-content">
                        <div className="my-read-title">
                            <h3>{diary.dream_name}</h3>
                        </div>
                        <div className="my-read-image">
                            <img src={diary.image_url} alt={diary.dream_name}/>
                        </div>
                        <div className={`my-read-text ${isOpen[index] ? 'open' : ''}`}>
                            <button className="toggle" onClick={() => handleToggle(index)}>내용 보기</button>
                            {isOpen[index] && (
                                <>
                                    <p>{diary.dream}</p>
                                    <p>{diary.resolution}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
