import React, {useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/Home.css';
import logo from '../image/docent_logo.png';
import pageView2 from '../image/pageView2.png';
import pageView303 from '../image/pageView303.png';
import { FaArrowDown } from 'react-icons/fa';

import { getUserCount} from "../services/apiService";

const HomePage = () => {
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState(null);
    const sectionIndex = useRef(0);
    const isScrolling = useRef(false);  // to prevent additional scrolling while a scroll is already in progress
    // const [currentPage, setCurrentPage] = useState(301);

    const handleButtonClick = (route) => {
        navigate(route);
    };

    const handleScrollClick = () => {
        sectionIndex.current = Math.min(sectionIndex.current + 1, 3); // Adjust this value to match the number of sections
        window.scroll({
            top: sectionIndex.current * window.innerHeight,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        AOS.init({
            duration : 2000
        });
    }, []);
    useEffect(() => {
        const fetchCounts = async () => {
            const userCount = await getUserCount();
            setUserCount(userCount);
        };
        fetchCounts();
    }, []);

    useEffect(() => {
        const handleWheel = (e) => {
            // Prevent additional scroll events while scrolling
            if (isScrolling.current) {
                e.preventDefault();
                return;
            }

            isScrolling.current = true;

            if (e.deltaY < 0) {
                // Scrolling up
                sectionIndex.current = Math.max(sectionIndex.current - 1, 0);
            } else {
                // Scrolling down
                sectionIndex.current = Math.min(sectionIndex.current + 1, 3); // Adjust this value to match the number of sections
            }

            window.scrollTo({
                top: sectionIndex.current * window.innerHeight,
                behavior: 'smooth'
            });

            // Prevent the default scroll behavior
            e.preventDefault();

            // Reset isScrolling.current after the scroll is complete
            setTimeout(() => {
                isScrolling.current = false;
            }, 1000);  // adjust this timeout to match the scroll speed
        }

        window.addEventListener('wheel', handleWheel, { passive: false });

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('wheel', handleWheel);
        }
    }, []);


    return (
        <div className="main">
            <div className="pageView">
                <header className="header">
                    <div>
                        <img src={logo} alt="Logo" className="logo"/>
                    </div>
                    <div className="menu-group">
                        <div className ="p-menu">
                            <div className="menu">
                                <a className={"home_a"} href="">
                                    <p>
                                        소개
                                    </p>
                                </a>
                            </div>
                            <div className="menu">
                                <a className={"home_a"} href="">
                                    <p>
                                        비즈니스
                                    </p>
                                </a>
                            </div>
                            <div className="menu">
                                <a className={"home_a"} href="">
                                    <p>
                                        언론
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="home_content" >
                    <div className="section" id="introduction" data-aos="fade-up">
                        <div className="home_p">
                            <h1>꿈 기록을 쉽고 재밌게<br></br>당신의 아침을 함께할 도슨트 입니다.</h1>
                        </div>
                    </div>
                    <div className="button-group">
                        <a href="http://pf.kakao.com/_vNxnRG" target="_blank" rel="noopener noreferrer">
                            <button className="home_button">
                                카카오톡 챗봇
                            </button>
                        </a>
                        <a href="https://liff.line.me/1645278921-kWRPP32q/?accountId=195uycli" target="_blank" rel="noopener noreferrer">
                            <button className="home_button">
                                라인 챗봇
                            </button>
                        </a>
                    </div>
                    <div id="scroll-arrow" onClick={handleScrollClick}>
                        <FaArrowDown className="arrow down" />
                    </div>
                </div>

            </div>
            <div className="pageView2" id="flow">
                <div className="pageView2-i">
                    <img src={pageView2} alt="pageView2" className="pageView2-img"/>
                </div>
                <div className="pageView2-p">
                        <h2>나만의 꿈 전시관,<br></br>도슨트 AI가 꿈 내용을 토대로<br></br>그림을 그려드려요.</h2>
                </div>
            </div>
            <div className="pageView3" id="flow">
                <div className="pageView3-l">
                    <h2>오늘 꾼 꿈의 의미,<br></br>도슨트 AI가 여러분의<br></br>꿈을 해몽해드려요.</h2>
                </div>
                <div className="pageView3-r">
                    <div className="pageView3-p1">
                        <p>
                            이 꿈은 당신의 목표에 대한 강한 의지와 야망,
                            <br></br>그리고 그것을 이루기 위한 탐색을 반영하고 있습니다.
                            <br></br>조수석에 앉아서 누군가가 운전하는 차는
                            <br></br>당신의 삶에 대한 현재의 제어력을
                            <br></br>의미할 수 있으며, 앞이 보이지 않는 곳에서의 질주는 불확실한
                            <br></br>미래로 나아가고 있다는 것을 상징합니다.
                            <br></br>차가 계곡에 빠지는 것은 예상치 못한 어려움이나 변화를
                            <br></br>나타낼 수 있습니다.
                            <br></br>그럼에도 불구하고 빌 게이츠를 만나고 그와 친해지는 것은
                            <br></br>당신이 이런 어려움을 극복하고 기회를 찾아내는 능력을 나타내며,
                            <br></br>그는 당신이 추구하는 이상적인 모델이나 멘토일 수 있습니다
                            <br></br>당신이 빌 게이츠에게 자신의 야망과 열정을 설명하는 것은
                            <br></br>당신의 목표에 대한 강한 결심과 헌신을 보여줍니다
                            <br></br>마지막으로, 빌 게이츠가 당신에게 카드를 주고 필요한 차를 사고
                            <br></br>시애틀로 오라고 하는 것은 당신이 목표를 달성하기 위해
                            <br></br>필요한 도구와 기회를 제공받고 있다는 것을 의미합니다.
                            <br></br>이 꿈은 당신이 현재의 상황에서 벗어나 목표를 향해
                            <br></br>나아가는 것에 대한 강한 의지와, 그 과정에서 필요한 도구와
                            <br></br>지원을 받을 수 있다는 긍정적인 메시지를 전달하고 있을 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>
            {/*<div className="pageView4" id="flow">*/}

            {/*</div>*/}
        </div>


);
};

export default HomePage;