import axios from 'axios';
import {SIMULAIR_API} from "../../config/app";
class SimulationApi {
    handle = null;
    constructor () {

    }



    setClient = (baseURL) => 
    { handle = axios.create({ 
        baseURL: baseURL
        
     }); 
     return this.getHandle();

    }

    getHandle = () => {
        if(handle == null) {
            console.log("Baseurl is not defined.")
        }
        else return this.handle;
    }

}
export default new SimulationApi;