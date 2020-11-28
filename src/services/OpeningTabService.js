import axios from 'axios';
import deneme from './apis/deneme';

class OpeningTabService {
    constructor(){

    }

     getHtmlPage(){
             return deneme
                    .get("/")
                    .then((result) => {
                        
                        return result.data
            })
    
    }


}

export default new OpeningTabService;