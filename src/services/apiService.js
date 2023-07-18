//***************************** 일반 체험 *********************************//
// 꿈 일기 생성
export async function createDream(dText) {
    try {
        const response = await fetch(`/api/mvp/dream?text=${dText}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            }
        });
        const Dream = await response.json();
        console.log('Dream:', Dream);
        if (response.ok) {
            return Dream.data;
        } else {
            if (response.status === 400) {
                alert('OpenAI 정책에 맞지 않는 내용입니다. 내용을 수정해주세요.');
            } else if (response.status === 500) {
                alert('오류가 발생했습니다. 다시 시도하거나 오류가 계속되면 문의 주세요(문의 : @_docent_official)');
            }
            throw new Error(Dream.error);
        }
    } catch (error) {
        console.error('Error fetching Dream content:', error);
    }
};

// 꿈 해몽
export async function dreamResolution(text) {
    try {
        const response = await fetch(`/api/mvp/resolution?text=${text}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            }
        });
        const resolution = await response.json();
        console.log('resolution:', resolution);
        if (response.ok) {
            return resolution.data;
        } else {
            if (response.status === 400) {
                alert('OpenAI 정책에 맞지 않는 내용입니다. 내용을 수정해주세요.');
            } else if (response.status === 500) {
                alert('오류가 발생했습니다. 다시 시도하거나 오류가 계속되면 문의 주세요(문의 : @_docent_official)');
            }
            throw new Error(resolution.error);
        }
    } catch (error) {
        console.error('Error fetching Dream resolution:', error);
    }
};

// 꿈 체크리스트
export async function dreamChecklist(dreamSolution, id) {
    try {
        console.log('text:', dreamSolution);
        const response = await fetch(`/api/mvp/checklist?resolution=${dreamSolution}&textId=${id}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            }
        });
        const checklist = await response.json();
        console.log('checklist:', checklist);
        if (response.ok) {
            return checklist.data;
        }
        else {
            throw new Error(checklist.error);
        }
    } catch (error) {
        console.error('Error fetching Dream checklist:', error);
    }
}

// 다이어리 생성
export async function createDiary(dreamData) {
    try {
        const response = await fetch('/api/mvp/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dreamData)
        });
        const result = await response.json();
        console.log('result:', result);
        if (response.ok) {
            return result.data;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error creating diary:', error);
    }
}
// Diary Read, 공유 링크
export const getDiary = async (diaryId) => {
    try {
        console.log('diaryId:', diaryId);
        const response = await fetch(`/api/mvp/read?diary_id=${diaryId}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            }
        });
        const data = await response.json();
        console.log('data:', data);
        if (response.ok) {
            return data.data;
        }
        else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Error fetching Diary Read:', error);
        throw error; // Error를 다시 던져서 상위 함수에서 처리할 수 있도록 합니다.
    }
}
//***************************** 일반 체험 끝 *********************************//
//***************************** 갓침 체험 *********************************//
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
// 꿈 일기 생성
export async function createGodDream(modelNum, dText) {
    try {
        const accessToken = localStorage.getItem('access_token');
        console.log('accessToken:', accessToken);
        console.log('dText:', dText);
        console.log('modelNum:', modelNum);
        const response = await fetch(`/api/generate/dream`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image_model: modelNum, text: dText })  // 요청 본문을 JSON 형식으로 전송
        });

        const Dream = await response.json();
        console.log("dream:",Dream);

        if (response.ok) {
            return Dream.data;
        } else {
            if (response.status === 400) {
                alert('OpenAI 정책에 맞지 않는 내용입니다. 내용을 수정해주세요.');
            } else if (response.status === 500) {
                alert('오류가 발생했습니다. 다시 시도하거나 오류가 계속되면 문의 주세요(문의 : @_docent_official)');
            }
            throw new Error(Dream.error);
        }

    } catch (error) {
        console.error('Error fetching Dream content:', error);
    }
};

// 꿈 해몽
export async function  dreamGodResolution(text) {
    try {
        const accessToken = localStorage.getItem('access_token');
        console.log('accessToken:', accessToken);
        console.log('dText:', text);
        const response = await fetch(`/api/generate/resolution`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })  // 요청 본문을 JSON 형식으로 전송
        });

        const Dream = await response.json();
        console.log("dream:",Dream);

        if (response.ok) {
            return Dream.data;
        } else {
            if (response.status === 400) {
                alert('OpenAI 정책에 맞지 않는 내용입니다. 내용을 수정해주세요.');
            } else if (response.status === 500) {
                alert('오류가 발생했습니다. 다시 시도하거나 오류가 계속되면 문의 주세요(문의 : @_docent_official)');
            }
            throw new Error(Dream.error);
        }

    } catch (error) {
        console.error('Error fetching Dream content:', error);
    }
};
export async function createGodDiary(dreamData) {
    try {
        const accessToken = localStorage.getItem('access_token');
        console.log('accessToken:', accessToken);
        const response = await fetch('/api/diary/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(dreamData)
        });
        const result = await response.json();
        console.log('result:', result);
        if (response.ok) {
            return result.data;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error creating diary:', error);
    }
}


// 다른 사람의 다이어리 읽기
export async function randomDiary(){
    try {
        const response = await fetch('/api/mvp/random', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            }
        });
        const data = await response.json();
        console.log('data:', data);
        if (response.ok) {
            return data.data;
        }
        else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Error fetching Random Diary:', error);
    }
}

//Mypage
export const getMyDiaryList = async (page) => {
    try {
        const accessToken = localStorage.getItem('access_token');
        console.log('accessToken:', accessToken);
        const response = await fetch(`/api/diary/list/mydiary?page=${page}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        const data = await response.json();
        console.log('data:', data);

        if (!response.ok) {
            console.error('Error response from server:', data);
            throw new Error(data.message || 'Unknown error');
        }

        return data;
    } catch (error) {
        console.error('Error fetching mydiary list:', error);
    }
};

export const getUserCount = async () => {
    try {
        const response = await fetch(`/api/mvp/user/count`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            }
        });
        const data = await response.json();
        console.log('data:', data);

        if (!response.ok) {
            console.error('Error response from server:', data);
            throw new Error(data.message || 'Unknown error');
        }

        return data.data;
    } catch (error) {
        console.error('Error fetching user count:', error);
    }
}

export const getDiaryCount = async () => {
    try {
        const response = await fetch(`/api/mvp/diary/count`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            }
        });
        const data = await response.json();
        console.log('data:', data);

        if (!response.ok) {
            console.error('Error response from server:', data);
            throw new Error(data.message || 'Unknown error');
        }

        return data.data;
    } catch (error) {
        console.error('Error fetching user count:', error);
    }
}