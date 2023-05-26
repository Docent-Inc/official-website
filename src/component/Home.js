import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../image/docent_logo.png';
import '../css/Home.css';
import flow1 from '../image/flow1.gif';
import flow2 from '../image/flow2.gif';
import flow3 from '../image/flow3.gif';

const HomePage = () => {
    const navigate = useNavigate();

    const handleButtonClick = (route) => {
        navigate(route);
    };

    useEffect(() => {
        AOS.init({
            duration : 2000
        });
    }, []);

    return (
        <div>
            <header className="header">
                <img src={logo} alt="Logo" className="logo"/>
                <div className="button-group">
                    <button className="button" onClick={() => handleButtonClick("/preRegister")}>
                        사전등록하기
                    </button>
                    <button className="button" onClick={() => handleButtonClick("/experience")}>
                        체험하기
                    </button>
                </div>
            </header>
            <div className="content">
                <img src={flow1} alt="Flow 1" data-aos="fade-up"/>
                <img src={flow3} alt="Flow 2" data-aos="fade-up"/>
                <img src={flow2} alt="Flow 3" data-aos="fade-up"/>
                <div className="section" id="introduction">
                    <p>"꿈은 무의식의 창이다."</p>
                    <p>당신의 아침을 함께할 어플, 도슨트입니다.</p>
                    <p>오늘 꾼 꿈을 잊어버리지 않게</p>
                    <p>음성을 통해 기록하고, 꿈을 해몽하고, 그림을 그려보세요.</p>
                </div>
                <div className="section" id="ourTeam">
                    <p>우리 팀은 창의성을 추구하고, 꿈을 사랑하는 사람들입니다.</p>
                    <p>개인의 창의성이 중요해지는 현대 사회,</p>
                    <p>우리는 문득 이런 생각을 했습니다.</p>
                    <p>"재미있는 꿈을 오래오래 기억할 수는 없을까?"</p>
                    <p>"꿈 속 장면이 그림으로 그려지면 좋겠다"</p>
                </div>
                <div className="section" id="ourService">
                    <p>도슨트는 당신의 꿈을 음성으로 기록해주고,</p>
                    <p>그 꿈을 해몽해드립니다.</p>
                    <p>당신이 무엇을 상상하고 있는지,</p>
                    <p>그 꿈이 당신에게 무엇을 말해주고 있는지 알려드리며,</p>
                    <p>하루의 운세를 제공해드립니다.</p>
                    <p>더불어 당신의 꿈을 그려볼 수 있는 도구인</p>
                    <p>그림을 제공합니다.</p>
                </div>
                <div className="section" id="ourVision">
                    <p>도슨트는 당신의 이야기를 그림으로 그려드릴게요.</p>
                    <p>자신만의 방식으로 꿈을 기록하고 기억해보세요.</p>
                    <p>기록이 누적 될수록 자신의 내면에 더 가까워 질 수 있습니다.</p>
                    <p>사용자들이 일어날 때 기분 좋은 수면 시간, 아침마다 느끼는 감정과 꾸는 꿈</p>
                    <p>데이터를 모아 좀 더 행복한 아침을 만들 수 있는 방법을 제공합니다.</p>
                    <p>도슨트와 함께하는 꿈의 세계는 언제나 특별하고,</p>
                    <p>현실과 차별화된 즐거움을 선사합니다.</p>
                    <p>꿈을 통해 하루를 성찰하고 의미있게 남겨보세요.</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;