import React, {Component} from 'react';
import io from 'socket.io-client';
import Zlib from 'zlib';
import {SIMULAIR_API} from '../../config/app';
import queryString from 'query-string';
import OpeningTabService from '../../services/OpeningTabService';
import SimulationImage from '../../components/workbench/SimulationImage';
import RobotManager from '../../components/workbench/RobotManager';


class SimulationWorkshop extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        show : true,

        socket : null,
        label_img : 1001,
        dataID_img : 0,
        dataLength_img : 0,
        receivedLength_img : 0,
        dataByte_img : new Uint8Array(0),
        ReadyToGetFrame_img : true,

        label_aud : 2001,
        dataID_aud : 0,
        dataLength_aud : 0,
        receivedLength_aud : 0,
        dataByte_aud : new Uint8Array(100),
        ReadyToGetFrame_aud : true,
        SourceSampleRate : 44100,
        SourceChannels : 1,
        ABuffer : new Float32Array(0),


        /////////////////////
        userId : "",
        control_api_dns_address : "",
        control_api_ip_address : "",
        simulair_web_api : SIMULAIR_API.BASE_URL
        }

        
       
    }

    componentDidMount() {
      
        this.getControlIp();
    
    }
    

    getControlIp =  ()  => {
        const params = queryString.parse(this.props.location.search);
        
        
         OpeningTabService.getIp(params.sim)
                         .then((result) => {
                             this.setState({
                                 control_api_ip_address:result.publicIP,
                                 control_api_dns_address:result.publicDNS
                             })
                         })
                         //${this.state.control_api_dns_address}
                         .then(() => {
                             
                            this.setState({socket : this.ConnectSocketIO(`http://${this.state.control_api_dns_address}:3003`)}); 
                            console.log(this.state.socket);
                            console.log("socket is created");
                        });
    }

    ConnectSocketIO = (control_api_address) => {
        var socket = io.connect(control_api_address);
            return socket;
        

    }
             


    render() {
//() => {this.ConnectSocketIO("http://localhost:3003")}
    

       
        
        return (
            <div className="WorkshopContainer">
            <SimulationImage connection={this.state.control_api_ip_address} socket={this.state.socket} socketUpdate={true}/>
            <RobotManager connection={this.state.control_api_ip_address} socket={this.state.socket}/>
            </div>
        )
    }

}

export default SimulationWorkshop;