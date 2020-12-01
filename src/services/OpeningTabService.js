import axios from 'axios';
import deneme from './apis/deneme';
import AuthService from './AuthService'

class OpeningTabService {
    constructor(){

    }

     getHtmlPage(sim_id){
        return AuthService.getAuthHeader().then(response => {
            return deneme
                    .post("/view" , {'sim_id': sim_id }, {headers : response })
                    .then((result) => {
                        console.log(result.data)
                    return result.data
    })
        })
             
    
    }


   

}

export default new OpeningTabService;