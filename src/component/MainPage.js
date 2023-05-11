import React, { useEffect, useState } from "react";
import { getDiaryList, likeDiary, unlikeDiary } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo.jpeg";
import Footer from "./Footer";
import "../css/MainPage.css";

function MainPage() {
    const navigate = useNavigate();
    const [diaryList, setDiaryList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);

    const mypageMove = () => {
        navigate("/mypage");
    };
    const createDreamMove = () => {
        navigate("/createdream");
    };
    const mainPageMove = () => {
        navigate("/main");
    };

    const fetchDiaryList = async () => {
        if (!isLoading && !isLastPage) {
            setIsLoading(true);

            const diary = await getDiaryList(page);
            console.log("Fetched diary list:", diary);

            if (diary.success) {
                if (diary.data.length === 0) {
                    setIsLastPage(true);
                    setIsLoading(false);
                    return;
                }

                setDiaryList((prevDiaryList) => [...prevDiaryList, ...diary.data]);
                setPage((prevPage) => prevPage + 1);
            }

            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDiaryList(); // 초기 데이터 로드
    }, []); // 의존성 배열을 빈 배열로 변경

    useEffect(() => {
        const handleScroll = async () => {
            const buffer = 200;
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - buffer &&
                !isLoading &&
                !isLastPage
            ) {
                await fetchDiaryList(); // 스크롤 이벤트에서 비동기 함수 호출
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading, isLastPage]);


    const accessToken = localStorage.getItem("access_token");

    const handleLikeClick = async (diaryId, isLiked) => {
        // 요청이 진행 중이 아닐 때만 API 호출 실행
        if (!isLiking) {
            setIsLiking(true);

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

            // API 호출 완료 후 isLiking 상태를 다시 false로 설정
            setIsLiking(false);
        }
    };

    return (
        <div>
            <header className="mainHeader">
                <img src={logo} alt="DOCENT Logo" className="logo" />
            </header>
            <div className="main_container">
                {diaryList.map((diary) => (
                    <div key={diary.id} className="main-list-item">
                        <img
                            src={diary.image_url}
                            alt={diary.dream_name}
                            onClick={() => navigate(`/diaryread/${diary.id}`)}
                        />

                        <div className={"buttons-container"}>
                            <button
                                onClick={() => handleLikeClick(diary.id, diary.is_liked)}
                                // 요청이 진행 중일 때 버튼을 비활성화
                                disabled={isLiking}
                            >
                                {diary.is_liked ? "❤️" : "🤍"} {diary.like_count}
                            </button>
                            <button>👁️ {diary.view_count}</button>
                            <button>💬 {diary.comment_count}</button>
                        </div>

                        <p>{diary.dream_name}</p>
                    </div>
                ))}
            </div>

            <div className="footer">
                <button onClick={mainPageMove}>🏠</button>
                <button onClick={createDreamMove}>➕</button>
                <button onClick={mypageMove}>👤</button>
            </div>
            <Footer />
        </div>

    );
}

export default MainPage;
