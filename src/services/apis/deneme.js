import axios from 'axios';

//https://cors-anywhere.herokuapp.com/https://www.soarrobotics.com
const axiosClient = axios.create({
    baseURL : "https://cors-anywhere.herokuapp.com/https://ju5x7v2aji.execute-api.eu-central-1.amazonaws.com/dev/view",
    headers : {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
    mode: "no-cors"
});


export default axiosClient;