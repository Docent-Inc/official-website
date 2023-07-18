import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../image/docent_logo.png';
import '../css/Home.css';
import flow1 from '../image/flow1.gif';
import flow2 from '../image/flow2.gif';
import flow3 from '../image/flow3.gif';
import jelly from '../image/jellyVideo.gif';
import h_draw_img1 from '../image/pageView2.png';
import h_draw_img2 from '../image/pageView2-1.jpeg';
import h_draw_img3 from '../image/pageView2-2.jpeg';
import h_draw_img4 from '../image/pageView2-3.jpeg';
import h_draw_img5 from '../image/pageView2-4.jpeg';
import h_kakao from '../image/home_kakao.png';
import h_line from '../image/home_line.png';
import { getUserCount} from "../services/apiService";
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
const HomePage = () => {
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [h_draw_img1, h_draw_img2, h_draw_img3, h_draw_img4, h_draw_img5];
    const flow = [flow1, flow2, flow3];
    const [startX, setStartX] = useState(0);
    const [touchOffset, setTouchOffset] = useState(0);


    const handleButtonClick = (route) => {
        navigate(route);
    };

    const handleScrollClick = () => {
        window.scrollBy({
            top: window.innerHeight,
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
    const nextSlide = () => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }

    const prevSlide = () => {
        setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
    }
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        const touchOffset = e.touches[0].clientX - startX;
        setTouchOffset(touchOffset);
    };

    const handleTouchEnd = () => {
        if (touchOffset > 150) { // Right swipe
            prevSlide();
        } else if (touchOffset < -150) { // Left swipe
            nextSlide();
        }
        setTouchOffset(0); // Reset touch offset
    };
    return (

        <div className="home_main">
            <div className="h_nv_bar">
                <div className="h_header h_header_default">
                    <div className="h_header_inner">
                        <img src={logo} alt="Logo" className="h_logo"/>
                        <div className="h_btn_group">
                            <a className={""} href="https://docs.google.com/forms/d/e/1FAIpQLSeLgNnhMPEcFo07G9eVjVUlpNcU9JZglnFGNGvgH5jIj9VnQg/viewform" target="_blank">
                                <button className="h_btn_reg">
                                    사전등록
                                </button>
                            </a>
                            <button className="h_btn_dStore" onClick={() => handleButtonClick("/loginpage")}>
                                보관하기
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="h_content">
                <div className="h_section" id="introduction" >
                    <div className="h_section_g">
                        <h1 className="h_section_h1">아침을 함께할, 도슨트<br></br>꿈 기록을 쉽고 재밌게<br></br></h1>
                        <div className="h_section_btnG">
                            <a className={""} href="http://pf.kakao.com/_vNxnRG" target="_blank">
                                <img src={h_kakao} alt="h_kakao" className="h_kakao"/>
                            </a>
                            <a className={""} href="https://liff.line.me/1645278921-kWRPP32q/?accountId=195uycli" target="_blank">
                                <img src={h_line} alt="h_line" className="h_line"/>
                            </a>
                        </div>
                        <img className="h_section_jelly" src={jelly} alt="jelly"/>
                        <div id="scroll-arrow" onClick={handleScrollClick}>
                            <i className="arrow down"></i>
                        </div>
                    </div>
                </div>
                <div className="h_section2" id="flow">
                    <div className="h_section2_container">
                        <div className="h_section2_text">
                            <h2 className="h_section2_h2">나만의 꿈 전시관,<br></br>도슨트 AI가 꿈 내용으로<br></br>그림을 그려드려요.</h2>
                        </div>
                        <div className="h_section2_img">
                            {/*<FaArrowCircleLeft onClick={prevSlide} className="carousel-arrow carousel-arrow-left" />*/}
                            <img src={h_draw_img1} alt="h_draw_img" className="h_draw_img"/>
                            {/*<FaArrowCircleRight onClick={nextSlide} className="carousel-arrow carousel-arrow-right"/>*/}

                        </div>
                    </div>
                </div>
                <div className="h_section3"
                     // onTouchStart={handleTouchStart}
                     // onTouchMove={handleTouchMove}
                     // onTouchEnd={handleTouchEnd}
                >
                    <div className="h_section3_prod">
                        <img src={flow1}/>
                        <img src={flow2}/>
                        <img src={flow3}/>
                    </div>

                </div>
                <div className="h_section4" id="flow">
                    <div className="story1" id="ourTeam" >
                        <div className="centered-text">
                            <p>
                                저희는 <strong>창의성을 추구하고, 꿈을 사랑하는 사람들입니다.</strong>
                            </p>
                            <p>개인의 창의성이 중요해지는 현대 사회</p>
                            <p>우리는 <strong>문득</strong> 이런 생각을 했습니다.</p>
                            <p><strong>"재미있는 꿈을 오래오래 기억할 수는 없을까?"</strong></p>
                        </div>
                        <p></p>
                        <div className="centered-text">
                            <p><strong>"꿈 속 장면이 그림으로 그려지면 좋겠다"</strong></p>
                        </div>
                    </div>
                    <div className="story2" id="ourService" >
                        <p>도슨트는 <strong>당신의 꿈을 음성으로 기록해주고,</strong></p>
                        <p><strong>그 꿈을 해몽해드립니다.</strong></p>
                        <p> 당신이 무엇을 상상하고 있는지, </p>
                        <p>그 꿈이 당신에게 무엇을 말해주고 있는지 알려드리며,</p>
                        <p><strong>하루의 운세를 제공해드립니다.</strong></p>
                    </div>
                    <div className="story3" id="ourVision" >
                        <p>
                            도슨트는 <strong>당신의 이야기를 그림으로 그려드릴게요.</strong>
                        </p>
                        <p>도슨트와 함께하는 꿈의 세계는 언제나 특별하고,</p>
                        <p>현실과 차별화된 즐거움을 선사합니다.</p>
                        <p><strong>꿈을 통해 하루를 성찰하고 의미있게 남겨보세요.</strong></p>
                    </div>
                </div>
            </div>
            <div className="h_footer">
                <p><strong>도슨트와 함께할 멤버를 찾고 있습니다!</strong></p>
                <a className={""} href="https://docentinc.notion.site/c706d99f1aab46f7b23dc4f69bfce005?pvs=4" target="_blank">
                    <button className="h_btn_member">
                        멤버 모집 바로가기
                    </button>
                </a>
            </div>
        </div>
    );
};

export default HomePage;