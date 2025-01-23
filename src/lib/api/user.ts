export async function getUser() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found');
    }

    try {
        const response = await fetch('http://localhost:8080/api/v1/getUser', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        return data.user;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
}
