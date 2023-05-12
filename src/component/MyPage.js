import React, { useEffect, useState, useCallback } from "react";
import { getMyDiaryList } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/MyPage.css";
import Footer from "./Footer";
import { throttle } from 'lodash';

function MyPage() {
    const navigate = useNavigate();
    const [diaryList, setDiaryList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true);

    const fetchMyDiaryList = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);

        const diary = await getMyDiaryList(page);

        if (diary.success) {
            if (diary.data.length > 0) {
                setDiaryList((prevDiaryList) => [...new Set([...prevDiaryList, ...diary.data])]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        }
        setIsLoading(false);
    }, [isLoading, hasMore, page]);

    const handleScroll = throttle(() => {
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;

        if (scrollTop + clientHeight >= scrollHeight - 50) {
            if (!isLoading) fetchMyDiaryList();
        }
    }, 500);



    useEffect(() => {
        fetchMyDiaryList();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchMyDiaryList]);

    return (
        <div className="mypage">
            <header className="mypage-header">
                <h2>내 꿈 목록</h2>
            </header>
            <div className="mypage-container">
                {diaryList.map((diary) => (
                    <div key={diary.id} className="mypage-list-item">
                        {/* Wrap the img element with Link */}
                        <Link to={`/diaryread/${diary.id}`}>
                            <img src={diary.image_url} alt={diary.dream_name} />
                        </Link>
                        <div className="item-info">
                            <p>{diary.dream_name}</p>
                            <div className="item-stats">
                                <span>👁️ {diary.view_count}</span>
                                <span>❤️ {diary.like_count}</span>
                                <span>💬 {diary.comment_count}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default MyPage;
