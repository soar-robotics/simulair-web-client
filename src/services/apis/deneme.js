import axios from 'axios';


const axiosClient = axios.create({
    baseURL : "https://cors-anywhere.herokuapp.com/https://www.soarrobotics.com",
    headers : {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
    mode: "no-cors"
});


export default axiosClient;