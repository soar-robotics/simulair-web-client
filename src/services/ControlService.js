// import axios from "axios";
// import queryString from 'query-string';
// import controller from './apis/simulationapi';

// class ControlService {
//     handle = null;

//     constructor() {
    
//     }
    
    
//     setClient = (baseURL) => 
//     { 
//         this.handle = controller.setClient(baseURL)
     

//     }

//     getHandle = () => {
//         if(handle == null) {
//             console.log("Baseurl is not defined.")
//             throw new Error("Baseurl is not defined");
//         }
//         else return this.handle;
//     }
//     //index, image , owner , type

//     updateRobot = (data) => {
//         this.getHandle().get("/robots", {
//             params: {
//                 ...{owner: data.owner,
//                     name : data.name,
//                     type : data.type
//                     }
//             }
//         })
//     }
// }
// export default new ControlService();
