export const AUTH_KEY = "nene_token";


export function isAuthenticated() {
    return Boolean(localStorage.getItem(AUTH_KEY));
}


export function login({ email, password }) {
    if (email && password) {
        localStorage.setItem(AUTH_KEY, JSON.stringify({ email, ts: Date.now() }))
        return true;
    }
    return false;
}


export function logout() {
    localStorage.removeItem(AUTH_KEY);
}