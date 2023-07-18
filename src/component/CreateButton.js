import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import '../css/CreateButton.css';

export default function CreateButton() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/creategoddream");
    };

    return (
        <div className="CreateButton">
            <button className="Button" onClick={handleBack} >
                <FontAwesomeIcon icon={faPencilAlt} size="lg"/>
            </button>
        </div>
    );
}