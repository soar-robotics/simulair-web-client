import axios from 'axios';
import moment from 'moment';

const baseURL = 'http://localhost:8000/api';
const authStorageKey = 'u_data';

const axiosClient = axios.create({
    baseURL: baseURL
});

const refreshAccessToken = (accessToken) => {
    // authHeader not needed at the moment, refresh token is enough, leaving it for possible future resons
    const authHeader = {Authorization: 'Bearer ' + accessToken};
    return axios.post(`${baseURL}/auth/token/refresh`, {
        platform: 'web'
    }, {
        withCredentials: true, ...{headers: authHeader}
    })
        .then(response => {
            if (response.data.access_token) {
                const authStorageObj = {
                    access_token: response.data.access_token,
                    expires_at: response.data.expires_at
                };
                localStorage.setItem(authStorageKey, JSON.stringify(authStorageObj));
            }

            return response.data;
        });
}

axiosClient.interceptors.request.use((config) => {
    const auth = JSON.parse(localStorage.getItem(authStorageKey));
    if (auth) {
        const tokenExpiresAt = moment.utc(auth.expires_at);
        const now = moment.utc();
        if (now.isAfter(tokenExpiresAt)) {
            return refreshAccessToken(auth.access_token)
                .then(response => {
                    config.headers = {...config.headers, ...{Authorization: `Bearer ${response.access_token}`}};
                    console.log('config after intercepting', config);
                    return config;
                })
                .catch(error => {
                    // access token was not refreshed due to error / invalid refresh token
                    console.log(error);
                    localStorage.removeItem(authStorageKey);
                    throw error;
                });
        }
        else {
            return config;
        }
    }
    else {
        return config;
    }
}, (error) => {
    return Promise.reject(error);
});

export {
    authStorageKey,
    baseURL
};
export default axiosClient;