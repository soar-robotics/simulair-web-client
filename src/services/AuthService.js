import axios from "axios";
import simulair, {authStorageKey, setAuthStorage} from './apis/simulair';
import {
	CognitoUserPool,
	CognitoUserAttribute,
    CognitoUser,
    CognitoUserSession,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';

class AuthService {
    constructor() {
        this.poolData = {
            UserPoolId: "eu-central-1_QXiNhM5ZH",
            ClientId: "1hoon7s3c7egce88jhrcpitomk"
        }
        
        this.userPool = new CognitoUserPool(this.poolData);
    }
    
    
    postLogin(email, password, callback) {
        
        const authData = {
            Username: email,
            Password: password
        };
        
        const authDetails = new AuthenticationDetails(authData);
        const userData = {
            Username: email,
            Pool: this.userPool
        };
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authDetails, {
            onSuccess (result){
                callback(null, result);
            },
            onFailure(err) {
                callback(err, null);
            }
        });
    }

/*
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
*/

    postLogout() {
        if(this.getCurrentUser()){
            this.getCurrentUser().signOut();
        }
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
        return this.userPool.getCurrentUser();
    }

    getAuthHeader() {
        let currentUser = this.getCurrentUser();
        if(currentUser){
            currentUser.getSession((err, session) => {
                if(err){
                    return;
                }else{
                    return {'Authorization' : session.getIdToken().getJwtToken()}
                }
            });
        }
    }
}

export default new AuthService();