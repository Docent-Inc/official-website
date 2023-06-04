import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import '../css/BackButton.css';

export default function BackButton() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="back">
            <button className="backButton" onClick={handleBack} >
                <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
            </button>
        </div>
    );
}
