// 로그인 데이터를 서버로 전송하는 함수
export async function kakaoLogin() {
    try {
        // TODO: test용으로 임시로 작성한 코드 /test 제외 후 빌드 필요
        const response = await fetch("/api/auth/kakao", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data; // 로그인 성공 시 반환된 데이터 반환
        } else {
            throw new Error("Login failed"); // 로그인 실패 시 오류 발생
        }
    } catch (error) {
        console.error(error);
    }
}

// 토큰 가져오기
export async function getAccessToken(code) {
    try {
        // TODO: test용으로 임시로 작성한 코드 /test 제외 후 빌드 필요
        console.log("code: ", code);
        const response = await fetch(`/api/auth/kakao/callback?code=${code}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (response.ok) {
            const result = await response.json();
            console.log("result :", result);

            // 로컬 스토리지에 데이터 저장
            localStorage.setItem("access_token", result.data.access_token);
            localStorage.setItem("refresh_token", result.data.refresh_token);
            localStorage.setItem("user_email", result.data.user_email);

            // 로컬 스토리지에 저장된 데이터 확인
            console.log("Stored access_token: ", localStorage.getItem("access_token"));
            console.log("Stored refresh_token: ", localStorage.getItem("refresh_token"));
            console.log("Stored user_email: ", localStorage.getItem("user_email"));

            return result; // 로그인 성공 시 반환된 데이터 반환

        } else {
            throw new Error("Login failed"); // 로그인 실패 시 오류 발생
        }
    } catch (error) {
        console.error(error);
    }
}

//다이어리 목록 불러오기
export const getDiaryList = async (page) => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(`/api/diary/list?page=${page}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching diary list:', error);
    }
};

// -- 다이어리 좋아요 --
// 다이어리 좋아요
export async function likeDiary(accessToken, diaryId) {
    const response = await fetch(`/api/diary/like?diary_id=${diaryId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    const result = await response.json();
    return result;
}
// 다이어리 좋아요 취소
export async function unlikeDiary(accessToken, diaryId) {
    const response = await fetch(`/api/diary/unlike?diary_id=${diaryId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    const result = await response.json();
    return result;
}



// 꿈 일기 생성
export async function createDream(dText) {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(`/api/generate/dream?text=${dText}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const Dream = await response.json();
        console.log("dream:",Dream);
        return Dream;
    } catch (error) {
        console.error('Error fetching Dream content:', error);
    }
};
export async function addDreamImage(textId) {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(`/api/generate/image?textId=${textId}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        const addImage = await response.json();
        return addImage;
    } catch (error) {
        console.error('Error fetching Dream Image:', error);
    }
};
export async function dreamResolution(id) {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(`/api/generate/resolution?textId=${id}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        const resolution = await response.json();
        return resolution;
    } catch (error) {
        console.error('Error fetching Dream resolution', error);
    }
};

export async function dreamChecklist(text, id) {
    try {
        const accessToken = localStorage.getItem('access_token');
        console.log('text:', text);
        const response = await fetch(`/api/generate/checklist?resolution=${text}&textId=${id}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        const checklist = await response.json();
        return checklist;
    } catch (error) {
        console.error('Error fetching Dream checklist:', error);
    }
}


export async function createDiary(dreamData) {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch('/api/diary/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(dreamData)
        });

        const result = await response.json();
        console.log("result:",result);
        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error creating diary:', error);
    }
}
// mypage
export const getMyDiaryList = async (page) => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(`/api/diary/list/mydiary/${page}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching mydiary list:', error);
    }
};
// Diary Read
export const getDiary = async (diaryId) => {
    try {
        const accessToken = localStorage.getItem('access_token');
        console.log("accessToken:",accessToken);
        const response = await fetch(`/api/diary/read?diary_id=${diaryId}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        const data = await response.json();
        console.log("data:",data);
        return data;
    } catch (error) {
        console.error('Error fetching Diary Read:', error);
    }
}

// 공개 여부 수정
export async function updatePublicStatus(diaryId, isPublic) {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(`/api/diary/update/ispublic?diary_id=${diaryId}&is_public=${isPublic}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error updating public status:', error);
    }
}
