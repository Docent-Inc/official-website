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

