// 로그인 데이터를 서버로 전송하는 함수
export async function kakaoLogin() {
    try {
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

export const kakaoRedirect = async (code, navigate) => {
    const result = await getAccessToken(code);
    if (result.success) {
        localStorage.setItem("access_token", result.data.access_token);
        localStorage.setItem("refresh_token", result.data.refresh_token);
        console.log("로그인 성공");
        navigate("/main");
    }
    return code;
};


// 카카오 로그인 후 리다이렉트 url에서 code를 추출후 서버로 로그인을 요청하는 함수
export async function getAccessToken(code) {
    try {
        const response = await fetch(`/api/auth/kakao/callback?code=${code}`, {
            method: "GET",
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

// 로그인 데이터를 서버로 전송하는 함수
const getAuthDataFromLocalStorage = () => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const userEmail = localStorage.getItem("user_email");
    const userPassword = localStorage.getItem("user_password");
    console.log(accessToken, refreshToken, userEmail, userPassword)
    return {
        accessToken,
        refreshToken,
        userEmail,
        userPassword,
    };
};


// 다이어리 데이터 목록을 서버로부터 받아오는 함수
export const getDiaryList = async (page) => {
    try {
        const authData = getAuthDataFromLocalStorage();

        const response = await fetch(`/api/diary/list?page=${page}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authData.accessToken}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching diary list:', error);
    }
};
