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
  const [dreamTime, setDreamTime] = useState("");
  const [isRecordDream, setIsRecordDream] = useState("");
  const [isShare, setIsShare] = useState("");
  const [isRecordPlatform, setIsRecordPlatform] = useState("");


  const captureRef = useRef(null);

  const scrollToResult = () => {
    if (result && captureRef.current) {
      captureRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (result && captureRef.current) {
      setTimeout(() => {
        captureRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 500); // 0.3초(300 밀리초) 뒤에 스크롤 이동
    }
  }, [result]);
  // App.js

  // App.js

  const scrollToBottom = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 200);
  };





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
    if (
        dream.length < 5 ||
        dream.length > 100 ||
        !dreamTime ||
        !isRecordDream ||
        !isShare ||
        !platformUsage ||
        !gender ||
        !mbti ||
        !department
    ) {
      return;
    }
    setLoading(true);

    console.log(JSONSurvey_change);
    axios
        .post(
            `/api/gpt/survey`,
            {
              dream,
              dreamTime,
              isRecordDream,
              isShare,
              isRecordPlatform: platformUsage,
              sex: gender,
              mbti,
              department,
            },
            {
              withCredentials: true,
            }
        )
        .then((response) => {
          console.log(response.data.data);
          setResult(response.data.data);
        })
        .catch((error) => {
          console.error(error);
          alert(
              "OpenAI 정책에 맞지 않는 내용이 포함되어 있습니다. 다시 입력해주세요."
          );
        })
        .finally(() => {
          setLoading(false);
        });
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
      alert('성공적으로 전송되었습니다.');
    } catch (error) {
      console.error(error);
      alert('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const isDisabled =
      dream.length < 5 ||
      dream.length > 100 ||
      !dreamTime ||
      !isRecordDream ||
      !isShare ||
      !platformUsage ||
      !gender ||
      !mbti ||
      !department;

  return (
      <div className="App">
        <h1>도슨트</h1>
        <p>안녕하세요!!<br/> 저희는 가천대학교 코코네스쿨 2기 <br/> 도슨트 팀 입니다<br/> 서비스 출시에 앞서 테스트하기 위해 <br/>만들어진 페이지 입니다<br/> 모든 설문에 응답 해주시면 <br/>꿈을 그려보실 수 있습니다<br/> 참여주셔서 감사합니다 😁<br/>*잘 때 꾸는 꿈</p>
        <form onSubmit={handleSubmit} style={{ border: '1px solid #000', padding: '20px', borderRadius: '5px' }}>

          {/* 설문조사 입력 칸 */}
          <div className="question-container1">
            <div className="question-item">
              <label htmlFor="dream-frequency" >* 일주일에 꿈을 몇 회 꾸시나요?</label>
              <div>
                <input type="radio" id="0times" name="dream-frequency" value="0회" onChange={(e) => setDreamTime(e.target.value)}/>
                <label htmlFor="0times">0회</label>
              </div>
              <div>
                <input type="radio" id="1to3times" name="dream-frequency" value="1~3회" onChange={(e) => setDreamTime(e.target.value)}/>
                <label htmlFor="1to3times">1~3회</label>
              </div>
              <div>
                <input type="radio" id="4to7times" name="dream-frequency" value="4~7회" onChange={(e) => setDreamTime(e.target.value)}/>
                <label htmlFor="4to7times">4~7회</label>
              </div>
            </div>

            <div className="question-item">
              <label htmlFor="dream-recording">* 꿈을 기록 하시나요?</label>
              <div>
                <input type="radio" id="always-record" name="dream-recording" value="항상 기록한다." onChange={(e) => setIsRecordDream(e.target.value)}/>
                <label htmlFor="always-record">항상 기록한다.</label>
              </div>
              <div>
                <input type="radio" id="tried-once" name="dream-recording" value="한번 그냥 기록해봤다." onChange={(e) => setIsRecordDream(e.target.value)} />
                <label htmlFor="tried-once">기록 해본적 있다.</label>
              </div>
              <div>
                <input type="radio" id="memorable-only" name="dream-recording" value="기억에 남는 꿈만 기록한다." onChange={(e) => setIsRecordDream(e.target.value)}/>
                <label htmlFor="memorable-only">기억에 남는 꿈만 기록한다.</label>
              </div>
              <div>
                <input type="radio" id="dont-record" name="dream-recording" value="기록을 안한다." onChange={(e) => setIsRecordDream(e.target.value)} />
                <label htmlFor="dont-record">기록을 안한다.</label>
              </div>
            </div>

            <div className="question-item">
              <label htmlFor="dream-sharing">* 꿈을 공유 하시나요?<br/>(ex 말, SNS)</label>
              <div>
                <input type="radio" id="always-share" name="dream-sharing" value="항상 공유한다." onChange={(e) => setIsShare(e.target.value)}/>
                <label htmlFor="always-share">항상 공유한다.</label>
              </div>
              <div>
                <input type="radio" id="tried-sharing" name="dream-sharing" value="한번 그냥 공유해봤다." onChange={(e) => setIsShare(e.target.value)}/>
                <label htmlFor="tried-sharing">공유 해본적 있다.</label>
              </div>
              <div>
                <input type="radio" id="memorable-share" name="dream-sharing" value="기억에 남는 꿈만 공유한다." onChange={(e) => setIsShare(e.target.value)} />
                <label htmlFor="memorable-share">기억에 남는 꿈만 공유한다.</label>
              </div>
              <div>
                <input type="radio" id="dont-share" name="dream-sharing" value="공유를 안한다." onChange={(e) => setIsShare(e.target.value)}/>
                <label htmlFor="dont-share">공유를 안한다.</label>
              </div>
            </div>
          </div>


              <div className="question-container1" >
            <div className="question-item">
              <label htmlFor="platform-input">* 플랫폼을 기록 목적으로 이용하나요?<br/>(네이버 블로그, 인스타, 일기어플 등)</label>
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
            <div className="question-item">
              <label htmlFor="gender-input">* 성별</label>
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

            <div className="question-item">
              <label htmlFor="mbti-input">* MBTI</label>
              <input
                  id="mbti-input"
                  value={mbti}
                  onChange={(e) => setMbti(e.target.value)}
                  required
              />
            </div>
            <div className="question-item">
              <label htmlFor="department-input">* 학과</label>
              <input
                  id="department-input"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
              />
            </div>
          </div>

          <div className="question-container1" >
              <label htmlFor="dream-input">* 꿈을 입력해보세요(5자~100자)</label>
              <div className="textarea-container">
            <textarea className='dreamText'
                id="dream-input"
                value={dream}
                onChange={(e) => handleDreamChange(e)}
                rows="4"
                cols="50"
            ></textarea>
                <div className="char-count">{charCount}</div>
              </div>
              <button type="submit" onClick={scrollToBottom} disabled={loading || isDisabled}>
                {loading ? 'Loading...' : '꿈 그리기'}
              </button>
          </div>
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
                  <p>인스타그램 아이디를 남겨주시면 추첨을 통해 스타벅스 커피 쿠폰을 드립니다.</p>
                  <label htmlFor="phone-number-input">아이디를 입력해주세요:</label>
                  <input
                      id="phone-number-input"
                      type="text"
                      pattern="\d{20}"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      required
                  />
                  <button onClick={handleSendPhoneNumber} disabled={!phoneNumber || phoneNumber.length < 1}>
                    전송
                  </button>
                </div>
              </>
          )}
      </div>
  );
}
export default App;