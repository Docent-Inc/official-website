import React, { useState, useEffect ,useRef } from 'react';
import axios from 'axios';
import './App.css';
import ImageSlider from './component/ImageSlider';
import loadimages from "./function/loadimages";

const images = loadimages();

function App() {
  // 기존 상태 변수
  const [dream, setDream] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');

  // 설문조사 상태 변수
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [mbti, setMbti] = useState('');
  const [department, setDepartment] = useState('');

  const captureRef = useRef(null);

  const imageKeys = Object.keys(images);

  const JSONSurvey = new Object();
  const [JSONSurvey_change, setJSONSurvey_change] = useState({});

  const [isPlatformUsed, setIsPlatformUsed] = useState(false);
  const [isMale, setIsMale] = useState(false);
  const [platformUsage, setPlatformUsage] = useState('');

  console.log(imageKeys);

  useEffect(()=>{
    JSONSurvey.dream = dream;
    JSONSurvey.gender = gender;
    JSONSurvey.age = age;
    JSONSurvey.mbti = mbti;
    JSONSurvey.department = department;

    setJSONSurvey_change(JSON.stringify(JSONSurvey));
  },[dream,gender,age,mbti,department])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    if (dream.length < 5 || dream.length > 100 || !gender || !age || !mbti || !department) {
      return;
    }
    setLoading(true);

    console.log(JSONSurvey_change);
    axios.post(`/api/gpt/survey`, {dream, gender, age, mbti, department},{
        withCredentials: true
    }).then((response)=>{
      console.log(response.data.data);
      setResult(response.data.data);
    }).catch((error)=>{
      console.error(error);
      alert("OpenAI 정책에 맞지 않는 내용이 포함되어 있습니다. 다시 입력해주세요.");
    }).finally(()=>{
        setLoading(false);
    })
  };

  const handleDreamChange = (e) => {
    setDream(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendPhoneNumber = async () => {
    try {
      await axios.post('/api/gpt/test', {phoneNumber, dreamName: dream});
      alert('전화번호가 성공적으로 전송되었습니다.');
    } catch (error) {
      console.error(error);
      alert('전화번호 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const isDisabled = dream.length < 5 || dream.length > 100 || !gender || !age || !mbti || !department;

  // 기존 이벤트 핸들러 및 코드 생략

  return (
      <div className="App">
        <h1>도슨트</h1>
        <form onSubmit={handleSubmit}>
          {/* 설문조사 입력 칸 */}
          <div>
            <label htmlFor="platform-input">플랫폼을 기록 목적으로 이용하나요? (네이버 블로그, 인스타, 일기어플 등):</label>
            <div>
              <input
                  type="radio"
                  id="yes"
                  name="platform"
                  value="네"
                  checked={platformUsage === "네"}
                  onChange={(e) => setPlatformUsage(e.target.value)}
              />
              <label htmlFor="yes">네</label>
            </div>
            <div>
              <input
                  type="radio"
                  id="no"
                  name="platform"
                  value="아니요"
                  checked={platformUsage === "아니요"}
                  onChange={(e) => setPlatformUsage(e.target.value)}
              />
              <label htmlFor="no">아니요</label>
            </div>
          </div>
          <div>
            <label htmlFor="gender-input">성별:</label>
            <div>
              <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="남성"
                  checked={gender === "남성"}
                  onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="male">남성</label>
            </div>
            <div>
              <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="여성"
                  checked={gender === "여성"}
                  onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female">여성</label>
            </div>
          </div>

          <div>
            <label htmlFor="mbti-input">MBTI:</label>
            <input
                id="mbti-input"
                value={mbti}
                onChange={(e) => setMbti(e.target.value)}
                required
            />
          </div>
          <div>
            <label htmlFor="department-input">학과:</label>
            <input
                id="department-input"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
            />
          </div>

          <label htmlFor="dream-input">꿈을 입력해보세요(5자~100자):</label>
          <div className="textarea-container">
        <textarea
            id="dream-input"
            value={dream}
            onChange={(e) => handleDreamChange(e)}
            rows="4"
            cols="50"
        ></textarea>
            <div className="char-count">{charCount}</div>
          </div>
          <button type="submit" disabled={loading || isDisabled}>
            {loading ? 'Loading...' : '꿈 그리기'}
          </button>
        </form>
        {loading && <ImageSlider images={imageKeys} interval={5000} />}
        {result && (
            <>
              <div ref={captureRef} className="result-container">
                <h2>{result.dream_name}</h2>
                <img
                    src={`${result.image_url}`}
                    alt="Dream Visualization"
                />
                <p>{result.dream}</p>
                <p>{result.dream_resolution}</p>
                <p>{result.today_luck}</p>
              </div>
              <div style={{ margin: '2%' }}>
                <p>안녕하세요!! 저희는 가천대학교 코코네스쿨 2기 도슨트 팀 입니다. 서비스 출시에 앞서 테스트하기 위해 만들어진 페이지 입니다. 전화번호를 남겨주시면 추첨을 통해 스타벅스 커피 쿠폰을 드립니다.</p>
                <label htmlFor="phone-number-input">전화번호를 입력해주세요:</label>
                <input
                    id="phone-number-input"
                    type="tel"
                    pattern="\d{11}"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                />
                <button onClick={handleSendPhoneNumber} disabled={!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 11}>
                  전화번호 전송
                </button>
              </div>
            </>
        )}
      </div>
  );
}
export default App;