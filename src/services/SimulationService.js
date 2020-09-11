import axios from "axios";
import queryString from 'query-string';
import simulair from './apis/simulair';
import AuthService from "./AuthService";

class SimulationService {
    constructor() {

    }

    getSimulations(status, search) {
        return simulair
            .get("/simulations", {
                params: {
                    ...(status ? {status} : {}),
                    ...(search ? {query: search} : {})
                },
                headers: AuthService.getAuthHeader()
            })
            .then(response => {
                console.log(response);

                return response.data;
            });
    }

    patchSimulationStatus(id, status) {
        return simulair
            .patch(`/simulations/${id}/${status}`, {}, {headers: AuthService.getAuthHeader()})
            .then(response => {
                console.log(response, response.data);

                return response.data;
            });
    }
}

export default new SimulationService();