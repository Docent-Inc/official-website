import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo.jpeg';  // 로고 이미지 파일 경로에 맞게 수정해주세요
import buttonImage from '../image/background.jpeg';  // 버튼 이미지 파일 경로에 맞게 수정해주세요

const HomePage = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/createDream");  // 다른 페이지의 경로를 적절하게 수정해주세요
    };
    useEffect(() => {
        const ad = document.querySelector('.kakao_ad_area');
        if (ad) ad.style.display = 'block';
    }, []);

    return (
        <div
            style={{
                height: '100vh',  // 높이를 필요에 맞게 조정해주세요
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center',
            }}
        >
            <img src={logo} alt="logo" style={{ width: '300px',marginTop:'50px' }} />
            <p style={{ margin:'0px' }}>태몽을 그리고 해몽하는 테스트</p>
            <p style={{ margin:'0px' }}>티켓 클릭!!</p>
            <img src={buttonImage} alt="button" onClick={handleButtonClick} style={{ width: '100%' }} />
        </div>
    );
};

export default HomePage;
