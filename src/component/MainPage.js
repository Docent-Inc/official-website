// import React, { useEffect, useState } from "react";
// import { getDiaryList } from "../services/apiService";
// import "../css/MainPage.css";
//
// function MainPage() {
//     const [diaryList, setDiaryList] = useState([]);
//
//     useEffect(() => {
//         async function fetchData() {
//             const data = await getDiaryList(1); // 첫 페이지의 데이터를 불러옵니다.
//             setDiaryList(data);
//         }
//         fetchData();
//     }, []);
//
//     return (
//         <div className="main-container">
//             <div className="diary-list">
//                 {diaryList.map((diary) => (
//                     <div className="diary-list-item" key={diary.id}>
//                         <img src={diary.image_url} alt={diary.dream_name} />
//                         <div className="diary-info">
//                             <h3>{diary.dream_name}</h3>
//                             <p>
//                 <span role="img" aria-label="views">
//                   👁️
//                 </span>
//                                 {diary.view_count}{" "}
//                                 <span role="img" aria-label="likes">
//                   ❤️
//                 </span>
//                                 {diary.like_count}{" "}
//                                 <span role="img" aria-label="comments">
//                   💬
//                 </span>
//                                 {diary.comment_count}
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// export default MainPage;
import React, { useEffect } from 'react';

function MainPage() {
    useEffect(() => {
        // const accessToken = localStorage.getItem('access_token');
        // const refreshToken = localStorage.getItem('refresh_token');
        //
        // console.log('Access Token:', accessToken);
        // console.log('Refresh Token:', refreshToken);
    }, []);

    // 나머지 MainPage 컴포넌트 코드 작성

    return (
        <div>
            <h1>메인 페이지</h1>
        </div>
    );
}

export default MainPage;
