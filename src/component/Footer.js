import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Footer.css';

function Footer() {
    const navigate = useNavigate();

    const mainPageMove = () => {
        navigate('/main');
    };

    const createDreamMove = () => {
        navigate('/createdream');
    };

    const mypageMove = () => {
        navigate('/mypage');
    };

    return (
        <div className="footer">
            <button onClick={mainPageMove}>🏠</button>
            <button onClick={createDreamMove}>➕</button>
            <button onClick={mypageMove}>👤</button>
        </div>
    );
}

export default Footer;
