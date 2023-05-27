import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../image/docent_logo.png';
import '../css/Home.css';
import flow1 from '../image/flow1.gif';
import flow2 from '../image/flow2.gif';
import flow3 from '../image/flow3.gif';
import jelly from '../image/jellyVideo.gif';
import main from '../image/mainimage.png';
import intro from '../image/introduce.png';
import outtro from '../image/outtro.png';
import image1 from '../image/1327.png';

const HomePage = () => {
    const navigate = useNavigate();

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

    return (
        <div className="main">
            <header className="header">
                <img src={logo} alt="Logo" className="logo"/>
                <div className="button-group">
                    <button className="button_register" onClick={() => handleButtonClick("/preRegister")}>
                        사전 등록
                    </button>
                </div>
            </header>
            <div className="content">
                <div className="section" id="introduction" data-aos="fade-up">
                    <div className="p">
                        <p >꿈 기록을 쉽고 재밌게</p>
                        <p >당신의 아침을 함께할,</p>
                        <p>도슨트입니다.</p>
                    </div>
                    <button className="button" onClick={() => handleButtonClick("/createDream")}>
                        체험하기
                    </button>
                    <img className="jelly" src={jelly} alt="jelly" data-aos="fade-up"/>
                    <div id="scroll-arrow" onClick={handleScrollClick}>
                        <i className="arrow down"></i>
                    </div>
                </div>
                <img className="mainImage" src={main} alt="main" data-aos="fade-up"/>
                <div className="content2">
                    <img src={flow1} alt="Flow 1" data-aos="fade-up"/>
                    <img src={flow2} alt="Flow 2" data-aos="fade-up"/>
                    <img src={flow3} alt="Flow 3" data-aos="fade-up"/>
                    <div className="section1" id="ourTeam" data-aos="fade-up">
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
                    <img className="introImage" src={intro} alt="intro" data-aos="fade-up"/>

                    <div className="section2" id="ourService" data-aos="fade-up">
                        <p>도슨트는 <strong>당신의 꿈을 음성으로 기록해주고,그 꿈을 해몽해드립니다.</strong></p>
                        <p> 당신이 무엇을 상상하고 있는지, </p>
                        <p>그 꿈이 당신에게 무엇을 말해주고 있는지 알려드리며,</p>
                        <p><strong>하루의 운세를 제공해드립니다.</strong></p>
                    </div>
                    <img className="image1" src={image1} alt="image1" data-aos="fade-up"/>
                    <div className="section3" id="ourVision" data-aos="fade-up">
                        <p>
                            도슨트는 <strong>당신의 이야기를 그림으로 그려드릴게요.</strong>
                        </p>
                        <p>도슨트와 함께하는 꿈의 세계는 언제나 특별하고,</p>
                        <p>현실과 차별화된 즐거움을 선사합니다.</p>
                        <p><strong>꿈을 통해 하루를 성찰하고 의미있게 남겨보세요.</strong></p>
                    </div>
                    <img className="outroImage" src={outtro} alt="outtro" data-aos="fade-up"/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;