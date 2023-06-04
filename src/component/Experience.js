import React from 'react';
import '../css/Experience.css';
import logo2 from "../image/newLogo.png";
import post from "../image/post.png";
import {useNavigate} from "react-router-dom";
import BackButton from './BackButton';

function Experience() {
    const navigate = useNavigate();

    const handleButtonClick = (route) => {
        navigate(route);
    };
    return (
        <div className="exContainer" style={{backgroundImage: `url(${post})`}}>
            <BackButton />
            <header className="exheader">
                <img className="logo" src={logo2} alt="logo" />
            </header>
            <div className="exFooter">
                <button className="button" onClick={() => handleButtonClick("/loginpage")}>
                    갓침 챌린지 도전!!
                </button>

            </div>
        </div>
    );
}

export default Experience;
