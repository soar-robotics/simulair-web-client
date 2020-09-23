import axios from "axios";
import queryString from 'query-string';
import simulair from './apis/simulair';
import AuthService from "./AuthService";

class RobotService {
    constructor() {

    }

    getRobots(search) {
        return simulair
            .get("/robots", {
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

export default new RobotService();