import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDream, getDiaryCount, createDiary, dreamResolution } from "../services/apiService";
import logo2 from '../image/newLogo.png';
import voiceJelly from '../image/voiceJelly.png';
import mikeRecordingBtn from '../image/jellyVideo.gif';
import BackButton from './BackButton';

import '../css/createDream.css';
import annyang from "annyang";

const funFacts = [
    '꿈은 REM 수면 단계에서 주로 일어난다. REM 수면은 Rapid Eye Movement의 약자로, 빠른 눈동자 움직임이 특징인 수면 단계입니다.',
    '대부분의 사람들은 하루에 4-6번의 꿈을 꾸지만, 대부분을 기억하지 못합니다. 꿈을 바로 일어나지 않으면 5분 이내에 50%를, 10분 이내에는 90% 이상을 잊어버립니다.',
    '꿈은 우리의 뇌가 경험한 일들을 처리하고 정리하는 방법일 수 있습니다. 이는 뇌가 새로운 정보를 기존의 지식과 결합하여 기억을 강화하는 과정을 돕습니다.',
    '꿈의 이해도 향상: 꿈을 기록하면 꿈을 더 잘 이해하게 됩니다. 꿈은 종종 복잡하고 혼란스러울 수 있지만, 꿈 일기를 쓰면서 꿈의 각 요소를 분석하고, 특정 패턴이나 반복되는 테마를 발견할 수 있습니다.',
    '창의성 증진: 꿈은 종종 판타지적이고 비현실적인 요소들을 포함하므로, 꿈을 기록하는 것은 창의성을 증진하는 데 도움이 될 수 있습니다. 꿈에서 얻은 영감을 바탕으로 이야기를 만들거나 아트워크를 제작하는 등의 창작 활동에 활용할 수 있습니다.',
    '자아 이해도 향상: 꿈은 종종 우리의 무의식적인 생각과 감정을 반영합니다. 따라서 꿈을 기록하고 분석하면 자신의 무의식적인 감정, 욕구, 두려움 등에 대한 이해도를 높일 수 있습니다. 이는 자기 성찰과 개인적 성장에 도움이 될 수 있습니다.'
    // ... 나머지 사실들
];


const CreateDream = () => {
    const navigate = useNavigate();
    const [dreamText, setDreamText] = useState('');
    const [dreamData, setDreamData] = useState(null);
    const [dreamResolutionData, setDreamResolutionData] = useState(null); // 꿈 해몽 데이터를 저장할 state
    const [loading, setLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [checklistData, setChecklistData] = useState(null); // 체크리스트 데이터를 저장할 state
    const [funFact, setFunFact] = useState('');
    const [isFirstLayoutVisible, setIsFirstLayoutVisible] = useState(true);
    const [showContainer, setShowContainer] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // 버튼 비활성화 상태를 관리할 새로운 state
    const [isPromptVisible, setIsPromptVisible] = useState(false);
    const [diaryCount, setDiaryCount] = useState(null);

    const handleButtonClick = async () => {
        if (dreamText.length < 10) {
            return;
        }
        navigate("/createDream");
        setLoading(true);

        const [result, resolutionResult] = await Promise.all([
            createDream(dreamText),
            dreamResolution(dreamText)
        ]);

        setDreamData(result);
        setDreamResolutionData(resolutionResult);

        setLoading(false);

        // checklist에 "checklist" 문자열을 넣어줍니다.
        setChecklistData({ today_checklist: "checklist" });
    };

    useEffect(() => {
        const fetchCounts = async () => {
            const diaryCount = await getDiaryCount();
            setDiaryCount(diaryCount);
        };
        fetchCounts();
    }, []);

    useEffect(() => {
        // 모든 데이터가 도착하면 createDiary를 호출합니다.
        if (dreamData && dreamResolutionData && checklistData) {
            handleGoToGallery();
        }
    }, [dreamData, dreamResolutionData, checklistData]);

    useEffect(() => {
        setIsButtonDisabled(dreamText.length < 10); // 꿈의 텍스트가 10자 미만이면 버튼을 비활성화합니다.
    }, [dreamText]);

    const handleFirstLayoutClick = () => {
        setIsFirstLayoutVisible(false);
        setShowContainer(true); // 첫 번째 레이아웃 클릭시 container 표시
    };

    const handleGoToGallery = async () => {
        const dreamDataToSave = {
            dream_name: dreamData.dream_name,
            dream: dreamData.dream,
            image_url: dreamData.image_url,
            resolution: dreamResolutionData.dream_resolution,
            checklist: checklistData.today_checklist,
            is_public: true
        };
        console.log('dreamDataToSave:', dreamDataToSave);
        const response = await createDiary(dreamDataToSave);
        if (response && response.id) {
            // DiaryRead 페이지로 이동하면서 id를 전달합니다.
            navigate(`/diary/${response.id}`, { state: { id: response.id } });
        }
    };

    const handleInputChange = (event) => {
        setDreamText(event.target.value.slice(0, 200)); // 입력 필드가 변경될 때마다 상태를 업데이트
    };

    const handleVoiceRecording = () => {
        if (!isRecording) {
            if (annyang) {
                // 언어 설정을 추가
                annyang.setLanguage('ko');

                // 음성 명령 설정
                var commands = {
                    "*text": function (text) {
                        console.log("인식된 음성 텍스트:", text);
                        setDreamText(dreamText + " " + text);
                    },
                };

                // 명령 추가
                annyang.addCommands(commands);

                // 음성 인식 시작
                annyang.start();
            }
        } else {
            // 음성 인식 종료
            if (annyang) {
                annyang.abort();
            }
        }

        setIsRecording(!isRecording);
        setIsPromptVisible(!isPromptVisible);
    };

    useEffect(() => {
        // 첫 번째 재미있는 사실을 선택
        setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);

        // 6초마다 새로운 사실을 선택
        const interval = setInterval(() => {
            setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
        }, 8000);

        // 컴포넌트 unmount시에 interval clear
        return () => clearInterval(interval);
    }, []);

    function randomDiaryRead() {
        const randomDiary = Math.floor(Math.random() * 300) + 1;
        navigate(`/diary/${randomDiary}`, { state: { id: randomDiary } });
    }

    return (
        <div className="createDream">
            <backButton />
            {loading ? ( // 로딩 중인 경우
                <div className="loading-effect">
                    <div className="header">
                        <img className="logo" src={logo2} alt="logo" />
                    </div>
                    <p className="dream_load_text">꿈을 그리는 중<span className="loading-dots">...</span></p>
                    <p className="fun-fact">{funFact}</p>
                </div>
            ) : (
                dreamData ? ( // 데이터가 도착한 경우
                    <div className="dream-result">
                    </div>
                ) : ( // 초기 상태
                    <>
                        <div className="container">
                            <BackButton/>
                            <div className="header">
                                <img className="logo" src={logo2} alt="logo" />
                            </div>
                            <div className="main">
                                <div className="text_field">
                                    <p className="textNum">{dreamText.length}/200</p> {/* 현재 글자 수를 표시 */}
                                     <textarea
                                         type="text"
                                         className="input-field"
                                         value={dreamText}
                                         onChange={handleInputChange}
                                         minLength={10}
                                         maxLength={200} // 글자 수를 300자로 제한
                                         placeholder="10자 이상 작성해주시면 그리기 버튼이 활성화 됩니다.
                                         아래의 젤리를 누르면 음성으로 기록이 가능합니다."
                                     >
                                    </textarea>

                                </div>

                                <div className="voice">

                                    {isRecording ?
                                        <img
                                            src={mikeRecordingBtn}
                                            alt="recording"
                                            className="recording"
                                            onClick={handleVoiceRecording}
                                        /> :
                                        <img
                                            src={voiceJelly}
                                            alt="not recording"
                                            className="n_recording"
                                            onClick={handleVoiceRecording}
                                        />
                                    }
                                    {isPromptVisible && <p>꿈을 말씀해주세요</p>}
                                </div>
                                <div className="fun-fact-container">
                                    <button
                                        onClick={handleButtonClick}
                                        className={`draw-btn ${isButtonDisabled ? 'disabled' : 'enabled'}`}
                                        disabled={isButtonDisabled}
                                    >
                                        꿈 그리기
                                    </button>
                                    <button className="draw-btn" onClick={() => randomDiaryRead()}>다른 꿈 보기</button>
                                </div>
                            </div>
                            <div className="dreamNum">
                                <p> 지금까지 꿈이</p>
                                <p>{diaryCount}개</p>
                                <p>그려졌어요.</p>
                            </div>
                        </div>

                    </>
                )
            )}
        </div>
    );
};

export default CreateDream;