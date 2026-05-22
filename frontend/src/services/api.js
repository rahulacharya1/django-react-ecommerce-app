import axios from "axios";

const DEFAULT_API_BASE_URL = typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:8000/api/`
    : "http://127.0.0.1:8000/api/";

const API_BASE_URL = import.meta.env.DEV
    ? DEFAULT_API_BASE_URL
    : (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL);

const API = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
    return match ? decodeURIComponent(match[2]) : null;
}

API.interceptors.request.use((config) => {
    const method = (config.method || "get").toLowerCase();
    if (!["get", "head", "options", "trace"].includes(method)) {
        const csrfToken = getCookie("csrftoken");
        if (csrfToken) {
            config.headers["X-CSRFToken"] = csrfToken;
        }
    }
    return config;
});

export default API;
