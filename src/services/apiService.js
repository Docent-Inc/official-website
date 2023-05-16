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
        }
        else {
            throw new Error(resolution.error);
        }
    } catch (error) {
        console.error('Error fetching Dream resolution', error);
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
    }
}