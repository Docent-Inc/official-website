import React, { useState, useEffect } from "react";
import { createDream, dreamChecklist, addDreamImage, createDiary } from "../services/apiService";
import "../css/CreateDream.css";
import Footer from "./Footer";
import ImageSlider from "./ImageSlider";
import { FaRedo } from "react-icons/fa";
import annyang from "annyang";

function CreateDreamPage() {
    const [dreamText, setDreamText] = useState("");
    const [dreamData, setDreamData] = useState(null);
    const [checklistData, setChecklistData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingChecklist, setIsLoadingChecklist] = useState(false);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [imageRefreshCount, setImageRefreshCount] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPublic, setIsPublic] = useState(true);
    const [isRecording, setIsRecording] = useState(false);

    const handleDreamTextChange = (event) => {
        setDreamText(event.target.value);
    };

    const handleDrawButtonClick = async () => {
        setIsLoading(true);
        const dream = await createDream(dreamText);
        setDreamData(dream);
        setIsLoading(false);
        console.log("dreamData:", dreamData);
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
    };

    const renderChecklistItems = (checklist) => {
        const items = checklist.split('\n');
        return items.map((item, index) => (
            <li key={index}>
                <input type="checkbox" id={`checklist-item-${index}`} />
                <label htmlFor={`checklist-item-${index}`}>{item}</label>
            </li>
        ));
    };
    const handleSaveButtonClick = async () => {
        if (dreamData && checklistData) {
            const diaryData = {
                dream_name: dreamData.data.dream_name,
                dream: dreamData.data.dream,
                image_url: currentImageIndex === 0 ? dreamData.data.image_url : additionalImages[currentImageIndex - 1],
                resolution: checklistData.data.dream_resolution,
                checklist: checklistData.data.today_checklist,
                is_public: isPublic,
            };

            const response = await createDiary(diaryData);

            alert(response.data.message);
            window.location.href = '/mypage';

        } else {
            alert("먼저 꿈을 그려주세요.");
        }
    };

    const handleRefreshImage = async () => {
        if (imageRefreshCount < 2) {
            setImageRefreshCount(imageRefreshCount + 1);
            const newImage = await addDreamImage(dreamData.data.id);
            setAdditionalImages([...additionalImages, newImage.data.image_url]);
        }
    };
    const handlePublicCheckboxChange = (event) => {
        setIsPublic(event.target.checked);
    };

    useEffect(() => {
        if (dreamData) {
            const fetchChecklist = async () => {
                console.log("dreamData:", dreamData);
                setIsLoadingChecklist(true);
                const checklist = await dreamChecklist(dreamData.data.id);
                console.log("checklist:", checklist);
                setChecklistData(checklist);
                setIsLoadingChecklist(false);
                console.log("checklist:", checklist);
            };
            fetchChecklist();
        }
    }, [dreamData]);

    return (
        <div className="create-dream-page">
            {!dreamData && (
                <>
                    {!isLoading && (
                        <>
                            <header className="createDreamHeader">
                                <h2>환영합니다. 꿈을 말씀해주세요.</h2>
                            </header>
                            <div className="container">
                            <textarea
                                className="dream-input"
                                value={dreamText}
                                onChange={handleDreamTextChange}
                                placeholder="꿈을 텍스트로 작성해주세요."
                            ></textarea>
                                <button className="draw-button" onClick={handleDrawButtonClick}>
                                    그리기
                                </button>
                                <button className="voice-record-button" onClick={handleVoiceRecording}>
                                    {isRecording ? "녹음 중지" : "음성으로 그리기"}
                                </button>
                            </div>
                        </>
                    )}

                    {isLoading && <h2>꿈을 그리는 중...</h2>}
                </>
            )}

            {dreamData && (
                <div className="dream-data">
                    <div className="dream-title">
                        <h3>{dreamData.data.dream_name}</h3>
                    </div>
                    <div className="dream-image">
                        <button
                            className="refresh-button"
                            onClick={handleRefreshImage}
                            disabled={imageRefreshCount >= 2}
                        >
                            <FaRedo />
                        </button>
                        <ImageSlider
                            images={[dreamData.data.image_url, ...additionalImages]}
                            currentIndex={currentImageIndex}
                            setCurrentIndex={setCurrentImageIndex}/>
                    </div>
                    <div className="dream-content">
                        <p>{dreamData.data.dream}</p>
                    </div>
                    {isLoadingChecklist ? (
                        <p>해몽 중...</p>
                    ) : (
                        checklistData && (
                            <>
                                <div className="dream-resolution">
                                    <p>{checklistData.data.dream_resolution}</p>
                                </div>
                                <div className="today-checklist">
                                    <ul>{renderChecklistItems(checklistData.data.today_checklist)}</ul>
                                </div>
                            </>
                        )
                    )}
                    <div className="public-checkbox">
                        <input
                            type="checkbox"
                            id="is-public-checkbox"
                            checked={isPublic}
                            onChange={handlePublicCheckboxChange}
                        />
                        <label htmlFor="is-public-checkbox">공개</label>
                    </div>
                    <button onClick={handleSaveButtonClick}>저장</button>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default CreateDreamPage;
