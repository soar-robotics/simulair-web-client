import axios from 'axios';
import simulair from './apis/simulair';
import AuthService from './AuthService'

class OpeningTabService {
    constructor(){

    }

     getHtmlPage(sim_id){
        return AuthService.getAuthHeader().then(response => {
            return simulair
                    .post("/view" , {'sim_id': sim_id }, {headers : response })
                    .then((result) => {
                        console.log(result.data)
                        
                    return result.data
    })
        })
             
    
    }
    getIp(sim) {
        return AuthService.getAuthHeader().then(response => {
            return simulair
                   .get("view",{
                    params: {
                        sim_id : sim
                    },
                    headers: response
                })
                    .then(response =>{
                        
                        return response.data;
                    })
        })
    }
    

   

}

export default new OpeningTabService;