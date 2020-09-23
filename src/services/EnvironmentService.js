import axios from "axios";
import queryString from 'query-string';
import simulair from './apis/simulair';
import AuthService from "./AuthService";

class EnvironmentService {
    constructor() {

    }

    getEnvironments(search) {
        return simulair
            .get("/environments", {
                params: {
                    ...(search ? {query: search} : {})
                },
                headers: AuthService.getAuthHeader()
            })
            .then(response => {
                console.log(response);

                return response.data;
            });
    }
}

export default new EnvironmentService();