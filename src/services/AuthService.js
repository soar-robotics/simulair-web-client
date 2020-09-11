import axios from "axios";
import simulair, {authStorageKey} from './apis/simulair';

class AuthService {
    constructor() {

    }

    login(email, password) {
        return simulair
            .post("/auth/token", {
                email: email,
                password: password,
                platform: 'web'
            },{
                withCredentials: true
            })
            .then(response => {
                console.log(response);
                if (response.data.access_token) {
                    localStorage.setItem(authStorageKey, JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        const authHeader = this.getAuthHeader();
        localStorage.removeItem(authStorageKey);

        const response = simulair
            .post("/auth/token/invalidate", {}, { headers: authHeader })
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

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(authStorageKey));
    }

    getAuthHeader() {
        const user = JSON.parse(localStorage.getItem(authStorageKey));

        if (user && user.access_token) {
            console.log(user.access_token);
            return { Authorization: `Bearer ${user.access_token}` };
        } else {
            return {};
        }
    }
}

export default new AuthService();