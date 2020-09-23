import {authTypes} from '../actions/types';
const INITIAL_STATE = {
    user: {}
};

const setUser = (payload) => {
    return {
        id: payload.id,
        email: payload.email,
        firstName: payload.first_name,
        lastName: payload.last_name,
        profileImage: payload.profile_image,
        username: payload.username,
        company: payload.company,
        fullName: `${payload.first_name} ${payload.last_name}`
    };
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case authTypes.FETCH_AUTH_USER:
        case authTypes.UPDATE_AUTH_USER:
            const userObject = setUser(action.payload);
            return {...state, user: userObject};
        case authTypes.UPDATE_AUTH_USER_IMAGE:
            return {...state, user: {...state.user, profileImage: action.payload}};
        default:
            return state;
    }
}