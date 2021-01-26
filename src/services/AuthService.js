import axios from "axios";
import simulair,{bucket_id} from './apis/simulair';
import {
	CognitoUserPool,
	CognitoUserAttribute,
    CognitoUser,
    CognitoUserSession,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';
import { reject, result } from "lodash";
import Amplify, {Auth,Storage} from 'aws-amplify';


class AuthService {
    constructor() {
        this.poolData = {
            UserPoolId: "eu-central-1_QXiNhM5ZH",
            ClientId: "1hoon7s3c7egce88jhrcpitomk"
        }
        this.authConfigure();
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

        /*
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
        */
    }


    postRegister(values) {
        return simulair
            .post(`/auth/register`, values)
            .then(response => {
                return response.data;
            });
    }

    getMe() {
        return this.getAuthHeader().then(response => {
            return simulair
            .get("/me", {headers : response})
            .then(response => {
                console.log(response.data);
                return response.data;
            });
        })
    }

    async patchUpdateMe(values) {
        const user = await Auth.currentAuthenticatedUser();

        return Auth.updateUserAttributes(user,{
            'custom:company' : values.company,
            'name' : values.first_name,
            'family_name' : values.last_name,
            'custom:username' : values.username
        });
        // return this.getAuthHeader().then(response => {
        //     console.log(response);
        //     return simulair
        //     .patch('/me', values, {headers: response})
        //     .then(response => {
        //         console.log(response, response.data);
        //         return response.data;
        //     })
        //     .catch(err => console.log(err))
        // })

    }

    postUpdateImage(file) {
        const formData = new FormData();
        formData.append('profile_image', file);

        return this.getAuthHeader().then(response => {
            console.log(response);
            return simulair
            .post(`/me/image`, formData, {
                headers: {
                    ...response,
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                }
            })
            .then(response => {
                console.log(response, response.data);

                return response.data;
            });
        })

    }

    getCurrentUser() {
        return this.userPool.getCurrentUser();
    }


    getAuthHeader(){
        return new Promise((resolve, reject) => {
        let currentUser = this.getCurrentUser();
        if(currentUser){
            currentUser.getSession((err, session) => {
                    if(err){
                        reject(new Error(err));
                    }else{
                        resolve({"Authorization" : session.getIdToken().getJwtToken()});
                    }
                });
            }
        });
    }
    getIdentityId = () => {

           return Auth.currentUserInfo();

    }
    onGoogleSignup(){

      return Auth.federatedSignIn({provider:'Google'});
    
       
    }
 
    uploadImage = async (file) => {
        let identityId;
        await this.SetS3Config("userpic-test","protected");
        
        await this.getIdentityId().then(result => {
            identityId = result.id;
        })
        
        return Storage.put(`${file.name}`,
                file,
                {contentType: file.type,
                 acl: "public-read"
                })
                .then(async () => {
                const user = await Auth.currentAuthenticatedUser();
                let url = `https://${bucket_id}.s3.eu-central-1.amazonaws.com/protected/${identityId}/${file.name}`;
                await Auth.updateUserAttributes(user,{
                    'picture' : url
                });
                return url;
                })
                .catch(err => {console.log(err)});
    }

    authConfigure = () => {
        Amplify.configure({
            Auth: {
        
                // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID

                identityPoolId: 'eu-central-1:238129e4-2f4c-4b0b-bd3a-ff02d8050a81',
        
                // REQUIRED - Amazon Cognito Region
                region: 'eu-central-1',
        
                // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
                // Required only if it's different from Amazon Cognito Region
                //identityPoolRegion: 'XX-XXXX-X',
        
                // OPTIONAL - Amazon Cognito User Pool ID
                userPoolId: 'eu-central-1_QXiNhM5ZH',
        
                // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
                userPoolWebClientId: '1hoon7s3c7egce88jhrcpitomk',
                
                
                oauth: {
                    domain: 'simulair-user-pool.auth.eu-central-1.amazoncognito.com',
                    redirectSignIn: 'http://localhost:3000/app/',
                    redirectSignOut: 'http://localhost:3000/login/',
                    responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
                }
                
            },
            Storage : {
                bucket : 'userpic-test',
                region : 'eu-central-1',
                identityPoolId: 'eu-central-1:238129e4-2f4c-4b0b-bd3a-ff02d8050a81'
            }
        });
    }

    SetS3Config = (bucket,level) => {
            Storage.configure({ 
                bucket: bucket,
                level: level,
                region: 'eu-central-1',
                identityPoolId: 'eu-central-1:238129e4-2f4c-4b0b-bd3a-ff02d8050a81'
            });
    }

}

export default new AuthService();
