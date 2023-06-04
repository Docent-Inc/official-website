import React from 'react';
import '../css/GodMorning.css';
import logo2 from "../image/newLogo.png";
import {useNavigate} from "react-router-dom";
import jelly from '../image/jellyVideo.gif';
import BackButton from './BackButton';

function GodMorning() {
    const navigate = useNavigate();

    const handleButtonClick = (route) => {
        navigate(route);
    };
    return (
        <div className="gdContainer">
            <BackButton />
            <header className="gdheader">
                <img className="logo" src={logo2} alt="logo" />
            </header>

            <div className="gdMain">
                <img className="jelly" src={jelly} alt="jelly"/>
            </div>
            <div className="gdFooter">
                <button className="gdbutton" onClick={() => handleButtonClick("/MyPage")}>
                    내 꿈 목록
                </button>
                <button className="gdbutton" onClick={() => handleButtonClick("/creategoddream")}>
                    꿈 기록
                </button>
            </div>
        </div>
    );
}

export default GodMorning;
