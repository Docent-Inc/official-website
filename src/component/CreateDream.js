import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from '../image/logo2.png';  // 로고 이미지 파일 경로에 맞게 수정해주세요
import drawBtn from '../image/drawBtn.png';  // 버튼 이미지 파일 경로에 맞게 수정해주세요
import '../css/createDream.css';

const CreateDream = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/createDream");  // 다른 페이지의 경로를 적절하게 수정해주세요
    };

    return (
        <div className="createDream">
            <img className="logo" src={logo2} alt="logo" />
            <h2>태몽을 입력해주세요</h2>
            <input type="text" className="input-field" />
            <button onClick={handleButtonClick} className="record-btn">음성 기록</button>
            <button onClick={handleButtonClick} className="draw-btn"><img src={drawBtn} alt="Draw" /></button>
        </div>
    );
};

export default CreateDream;
