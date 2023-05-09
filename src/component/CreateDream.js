import React, { useState, useEffect } from "react";
import { createDream, dreamChecklist, addDreamImage, createDiary,dreamResolution } from "../services/apiService";
import "../css/CreateDream.css";
import Footer from "./Footer";
import ImageSlider from "./ImageSlider";
import { FaRedo } from "react-icons/fa";
import { FaMicrophone } from 'react-icons/fa';
import annyang from "annyang";

function CreateDreamPage() {
    const [dreamText, setDreamText] = useState("");
    const [dreamData, setDreamData] = useState(null);
    const [checklistData, setChecklistData] = useState(null);
    const [resolutionData, setResolutionData] = useState(null); // 이 부분을 추가하세요
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingChecklist, setIsLoadingChecklist] = useState(false);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [imageRefreshCount, setImageRefreshCount] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPublic, setIsPublic] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [isLoadingResolution, setIsLoadingResolution] = useState(false);
    const [factIndex, setFactIndex] = useState(0);
    const [isLoadingImage, setIsLoadingImage] = useState(false);


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
            <li key={index}>{item}</li>
        ));
    };

    const handleSaveButtonClick = async () => {
        if (dreamData && checklistData) {
            const diaryData = {
                dream_name: dreamData.data.dream_name,
                dream: dreamData.data.dream,
                image_url: currentImageIndex === 0 ? dreamData.data.image_url : additionalImages[currentImageIndex - 1],
                resolution: resolutionData.data.dream_resolution,
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
            setIsLoadingImage(true); // 이미지를 가져오는 중으로 설정
            setImageRefreshCount(imageRefreshCount + 1);
            const newImage = await addDreamImage(dreamData.data.id);
            setAdditionalImages([...additionalImages, newImage.data.image_url]);
            setIsLoadingImage(false); // 이미지 가져오기 완료
        }
    };

    const handlePublicCheckboxChange = (event) => {
        setIsPublic(event.target.checked);
    };

    const fetchResolutionAndChecklist = async () => {
        console.log("dreamData:", dreamData);

        setIsLoadingResolution(true);
        const resolution = await dreamResolution(dreamData.data.id);
        console.log("resolution:", resolution);
        setIsLoadingResolution(false);
        setResolutionData(resolution); // 이 부분을 추가하세요

        setIsLoadingChecklist(true);
        const checklist = await dreamChecklist(resolution.data.text, dreamData.data.id);
        console.log("checklist:", checklist);

        setChecklistData(checklist);
        setIsLoadingChecklist(false);
    };

    const facts = [
        '"모든 사람들은 꿈을 꾸지만, 모든 사람이 그것을 기억하지는 못합니다. 꿈을 기억하는 능력은 사람마다 다르며, 일부 사람들은 거의 모든 꿈을 기억하고, 다른 사람들은 거의 기억하지 못합니다."',
        '"꿈은 REM(빠른 눈동자 움직임) 수면 단계에서 가장 자주 발생합니다. 이 단계는 일반적으로 수면 주기의 마지막 부분에 이루어지며, 가장 깊은 수면 상태입니다."',
        '"모든 사람들은 꿈에서 \'파라독시컬 슬립\'을 경험합니다. 이것은 꿈에서 자신이 잠들어 있음을 알아차리는 경험을 의미합니다."',
        '"일상 생활에서 경험하는 스트레스는 꿈에 큰 영향을 미칠 수 있습니다. 스트레스가 높은 시기에는 악몽이 더 자주 발생할 수 있습니다."',
        '"꿈은 문화, 신념, 개인 경험 등에 따라 크게 달라질 수 있습니다. 예를 들어, 어떤 문화에서는 꿈을 미래 예측의 수단으로 여기는 반면, 다른 문화에서는 꿈을 정신 세계와의 연결로 간주하기도 합니다."',
        '"심리학자들은 꿈이 우리의 무의식적인 욕구와 갈등을 반영할 수 있다고 주장합니다. 이러한 관점에서, 꿈은 우리의 정신적인 건강과 복잡한 감정 상태에 대한 중요한 통찰력을 제공할 수 있습니다."',
        '"사람들은 일상 생활에서 더 자주 만나는 사람들을 꿈에서 더 자주 만납니다. 이것은 \'배우자 효과\'라고도 하며, 가장 친한 사람들이 우리의 꿈에 가장 자주 등장하는 경향을 설명합니다."',
        '"일부 연구에 따르면, 꿈은 창의력과 문제 해결 능력을 향상시킬 수 있습니다. 꿈에서는 일상적인 생활에서 접하지 못하는 비일상적인 상황과 아이디어를 탐색하게 되므로, 이러한 경험이 창의적인 사고를 촉진하고 새로운 해결책을 찾는 데 도움이 될 수 있습니다.',
        '"다양한 연구들은 동물들도 꿈을 꾼다고 보고하고 있습니다. 특히, 개와 고양이 같은 애완동물들은 수면 중에 활발한 뇌 활동을 보이며, 이는 꿈을 꾸고 있다는 것을 시사합니다."',
        '"일부 사람들은 \'자각 꿈\'을 꾸는 능력을 가지고 있습니다. 이들은 꿈 속에서 자신이 꿈을 꾸고 있다는 것을 인식하고, 꿈의 내용을 의도적으로 조종할 수 있습니다."',

        // 더 많은 상식을 추가하세요
    ];

    useEffect(() => {
        if (dreamData) {
            const fetchResolutionAndChecklist = async () => {
                console.log("dreamData:", dreamData);
                setIsLoadingResolution(true);
                setIsLoadingChecklist(true);
                const resolution = await dreamResolution(dreamData.data.id);
                console.log("resolution:", resolution);
                setResolutionData(resolution); // 이 부분을 추가하세요
                setIsLoadingResolution(false);

                const checklist = await dreamChecklist(resolution.data.dream_resolution, dreamData.data.id);
                console.log("checklist:", checklist);

                setChecklistData(checklist);

                setIsLoadingChecklist(false);
            };
            setResolutionData(null);
            fetchResolutionAndChecklist();
        }
    }, [dreamData]);

    useEffect(() => {
        if (isLoading) {
            const intervalId = setInterval(() => {
                setFactIndex((prevFactIndex) => (prevFactIndex + 1) % facts.length);
            }, 5000); // 5초마다 다음 상식을 표시

            return () => clearInterval(intervalId); // Clean up interval on unmount
        }
    }, [isLoading]);
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
                                    {isRecording ? "녹음 중지" : <FaMicrophone />}
                                </button>
                            </div>
                        </>
                    )}

                    {isLoading && (
                        <>
                            <p className="fact">{facts[factIndex]}</p>
                            <h2 className="loading">꿈을 그리는 중</h2>
                        </>
                    )}

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
                        {isLoadingImage && <p className="imageLoding">새로운 그림을 가져오는 중</p>}

                        <ImageSlider
                            images={[dreamData.data.image_url, ...additionalImages]}
                            currentIndex={currentImageIndex}
                            setCurrentIndex={setCurrentImageIndex}/>
                    </div>
                    <div className="dream-content">
                        <p>{dreamData.data.dream}</p>
                    </div>

                    {isLoadingResolution ? (
                        <p className="loading2">해몽 중</p>
                    ) : (
                        resolutionData && (
                            <>
                                <div className="dream-resolution">
                                    <p>{resolutionData.data.dream_resolution}</p>
                                </div>
                                {isLoadingChecklist ? (
                                    <p className="loading3">체크리스트 생성 중</p>
                                ) : (
                                    checklistData && (
                                        <>
                                            <div className="today-checklist">
                                                <ul>{renderChecklistItems(checklistData.data.today_checklist)}</ul>
                                            </div>
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
                                        </>
                                    )
                                )}
                            </>
                        )
                    )}


                </div>
            )}
            <Footer />
        </div>
    );
}

export default CreateDreamPage;
