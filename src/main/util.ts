export const getUserId = () => {
    const userString = localStorage.getItem('user');

    if(userString) {
        const user = JSON.parse(userString);
        return user.id;
    }

    return null;
}

export const getCurrentUser = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
        return JSON.parse(userString);
    }
    return null;
};

export const isUserLoggedIn = () => {
    return localStorage.getItem('user') !== null;
};