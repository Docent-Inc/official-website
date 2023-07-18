import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import '../css/MyPageButton.css';

export default function MyPageButton() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/myPage");
    };

    return (
        <div className="myDiaryButton">
            <button className="Button" onClick={handleBack} >
                <FontAwesomeIcon icon={faHome} size="lg"/>
            </button>
        </div>
    );
}
