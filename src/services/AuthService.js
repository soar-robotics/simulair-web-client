import axios from "axios";
import simulair, {authStorageKey, setAuthStorage} from './apis/simulair';

class AuthService {
    constructor() {

    }

    postLogin(email, password) {
        return simulair
            .post("/auth/token", {
                email: email,
                password: password,
                platform: 'web'
            }, {
                withCredentials: true
            })
            .then(response => {
                console.log(response);
                if (response.data.access_token) {
                    setAuthStorage(response.data);
                }

                return response.data;
            });
    }

    postLogout() {
        const authHeader = this.getAuthHeader();
        localStorage.removeItem(authStorageKey);

        const response = simulair
            .post("/auth/token/invalidate", {}, {headers: authHeader})
            .then(response => {
                console.log(response, response.data);

                return response.data;
            })
            .catch(error => {
                console.log(error);
                throw error;
            });

        return response;
    }

    postGoogleLogin(code, scope) {
        return simulair
            .post(`/auth/oauth/google/callback`, null, {
                params: {code, scope},
                withCredentials: true
            })
            .then(response => {
                console.log(response);
                if (response.data.access_token) {
                    setAuthStorage(response.data);
                }

                return response.data;
            });
    }

    postRegister(values) {
        return simulair
            .post(`/auth/register`, values, {headers: this.getAuthHeader()})
            .then(response => {
                console.log(response, response.data);

                return response.data;
            });
    }

    getMe() {
        return simulair
            .get("/me", {
                headers: this.getAuthHeader()
            })
            .then(response => {
                console.log(response);

                return response.data;
            });
    }

    patchUpdateMe(values) {
        return simulair
            .patch(`/me`, values, {headers: this.getAuthHeader()})
            .then(response => {
                console.log(response, response.data);

                return response.data;
            });
    }

    postUpdateImage(file) {
        const formData = new FormData();
        formData.append('profile_image', file);

        return simulair
            .post(`/me/image`, formData, {
                headers: {
                    ...this.getAuthHeader(),
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log(response, response.data);

                return response.data;
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(authStorageKey));
    }

    getAuthHeader() {
        const user = JSON.parse(localStorage.getItem(authStorageKey));

        if (user && user.access_token) {
            console.log(user.access_token);
            return {Authorization: `Bearer ${user.access_token}`};
        } else {
            return {};
        }
    }
}

export default new AuthService();