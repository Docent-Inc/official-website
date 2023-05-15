import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from '../image/logo2.png';  // 로고 이미지 파일 경로에 맞게 수정해주세요
import drawBtn from '../image/drawBtn.png';  // 버튼 이미지 파일 경로에 맞게 수정해주세요
import mikeBtn from '../image/mike.png'; // 마이크 이미지 파일 경로에 맞게 수정해주세요
import '../css/createDream.css';

const CreateDream = () => {
    const navigate = useNavigate();
    const [dreamText, setDreamText] = useState(''); // 텍스트 필드의 상태를 추적하는 state

    const handleButtonClick = async () => {
        navigate("/createDream");  // 다른 페이지의 경로를 적절하게 수정해주세요
        await createDream(dreamText); // 꿈 그리기 버튼 클릭 시 createDream 함수 호출
    };

    const handleInputChange = (event) => {
        setDreamText(event.target.value); // 입력 필드가 변경될 때마다 상태를 업데이트
    };

    return (
        <div className="createDream">
            <img className="logo" src={logo2} alt="logo" />
            <p className="text">태몽을 입력해주세요</p>

            <input type="text" className="input-field" onChange={handleInputChange} />
            <img src={mikeBtn} alt="record" className="mike-btn" onClick={handleButtonClick}/>

            <button onClick={handleButtonClick} className="draw-btn">꿈 그리기</button>
        </div>
    );
};

async function createDream(dText) {
    try {
        const response = await fetch(`/api/mvp/dream?text=${dText}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            }
        });
        const Dream = await response.json();
        if (response.ok) {
            return Dream.data;
        } else {
            throw new Error(Dream.error);
        }
    } catch (error) {
        console.error('Error fetching Dream content:', error);
    }
};

export default CreateDream;
