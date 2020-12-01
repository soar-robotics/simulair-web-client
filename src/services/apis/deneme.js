import axios from 'axios';
import queryString from 'query-string';

//https://cors-anywhere.herokuapp.com/https://www.soarrobotics.com
const axiosClient = axios.create({
    baseURL : "https://ju5x7v2aji.execute-api.eu-central-1.amazonaws.com/dev"
});


export default axiosClient;