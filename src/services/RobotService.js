import axios from "axios";
import queryString from 'query-string';
import simulair from './apis/simulair';
import AuthService from "./AuthService";

class RobotService {
    constructor() {

    }

    getRobots(search) {
        return AuthService.getAuthHeader().then(response => {
            console.log(response);
            return simulair
            .get("/robots", {
                params: {
                    ...(search ? {query: search} : {})
                },
                headers: response
            })
            .then(response => {
                console.log(response);

                return response.data;
            });
        });
    }
}

export default new RobotService();