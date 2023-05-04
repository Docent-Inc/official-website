export async function fetchData(redirectUrl) {
    const response = await fetch(redirectUrl);
    const data = await response.json();
    return data;
}