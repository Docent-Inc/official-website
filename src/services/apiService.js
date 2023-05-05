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

// 카카오 로그인 후 리다이렉트 url에서 code를 추출후 서버로 로그인을 요청하는 함수
export async function getAccessToken(code) {
    try {
        console.log("code: ", code);
        const response = await fetch(`/api/auth/kakao/callback?code=${code}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("data :",data);
            return data; // 로그인 성공 시 반환된 데이터 반환

        } else {
            throw new Error("Login failed"); // 로그인 실패 시 오류 발생
        }
    } catch (error) {
        console.error(error);
    }
}

// 다이어리 데이터 목록을 서버로부터 받아오는 함수
export const getDiaryList = async (page) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

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
