export async function loginUser(username, password) {
    const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: '',
            username: username,
            password: password,
            scope: '',
            client_id: '',
            client_secret: '',
        }),
    });


    if (response.ok) {
        const data = await response.json();
        return data; // 로그인 성공 시 반환된 데이터 반환
    } else {
        throw new Error('Login failed'); // 로그인 실패 시 오류 발생
    }
}

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


export async function registerUser(email, username, nickname, password) {
    const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, nickname, password }),
    });

    return response.json();
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


// Add other API functions here