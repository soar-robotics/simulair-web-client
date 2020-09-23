import axios from 'axios';
import moment from 'moment';
import {SIMULAIR_API} from "../../config/app";

const baseURL = SIMULAIR_API.BASE_URL;
const authStorageKey = 'u_data';

const axiosClient = axios.create({
    baseURL: baseURL
});

const setAuthStorage = (authData) => {
    const authStorageObj = {
        access_token: authData.access_token,
        expires_at: authData.expires_at
    };
    localStorage.setItem(authStorageKey, JSON.stringify(authStorageObj));
}

const refreshAccessToken = (accessToken) => {
    // authHeader not needed at the moment, refresh token is enough, leaving it for possible future reasons
    const authHeader = {Authorization: 'Bearer ' + accessToken};
    return axios.post(`${baseURL}/auth/token/refresh`, {
        platform: 'web'
    }, {
        withCredentials: true, ...{headers: authHeader}
    })
        .then(response => {
            if (response.data.access_token) {
                setAuthStorage(response.data);
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
            localStorage.removeItem(authStorageKey);

            return refreshAccessToken(auth.access_token)
                .then(response => {
                    config.headers = {...config.headers, ...{Authorization: `Bearer ${response.access_token}`}};
                    console.log('config after intercepting', config);
                    return config;
                })
                .catch(error => {
                    // access token was not refreshed due to error / invalid refresh token
                    console.log(error);
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
    baseURL,
    setAuthStorage
};
export default axiosClient;