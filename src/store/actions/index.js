import AuthService from "../../services/AuthService";
import {authTypes} from './types';

export const fetchAuthUser = () => async (dispatch) => {
    
    AuthService.getMe()
        .then((response) => {
            dispatch({type: authTypes.FETCH_AUTH_USER, payload: response.data});
        }); 
};

export const updateUser = (user) => {
    return {
        type: authTypes.UPDATE_AUTH_USER,
        payload: user,
    };
};

export const updateUserImage = (imageUrl) => {
    return {
        type: authTypes.UPDATE_AUTH_USER_IMAGE,
        payload: imageUrl,
    };
};