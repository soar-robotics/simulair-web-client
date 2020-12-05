import axios from "axios";
import queryString from 'query-string';
import simulair from './apis/simulair';
import AuthService from "./AuthService";

class SimulationService {
    constructor() {

    }

    // deleteSimulation(id) {
    //     return simulair
    //         .delete(`/simulations/${id}`, {}, {headers: AuthService.getAuthHeader()})
    //         .then(response => {
    //          return response.data;
    //         });  
    // }

    getSimulations(status, search) {
        return AuthService.getAuthHeader().then(response => {
            return simulair
            .get("/simulations", {
                params: {
                    ...(status ? {status} : {}),
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
    patchSimulationStatus(id, status) {
        return AuthService.getAuthHeader().then(response => {
            return simulair
            .patch(`/simulations/${id}/${status}`, {}, {headers: response})
            .then(response => {
                console.log(response, response.data);

                return response.data;
            });
        });
    }

    postCreate(values) {
        return AuthService.getAuthHeader().then(response => {
            return simulair
            .post(`/simulations`, values, {headers: response})
            .then(response => {
                return response.data;
            });
        });
    }
}

export default new SimulationService();