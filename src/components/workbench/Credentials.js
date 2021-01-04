import React,{Component} from 'react';
import {
    CCard,
    CCardHeader,
    CCardBody
} from '@coreui/react';
import CredentialCard from './CredentialCard';

class Credentials extends Component {
    constructor(props){
        super(props);
        this.state = {
            vpnCreds : [],
            counter : 0
        }
    }

    componentDidMount() {
    
    }
    
    onaddCredential = () => {
        if(this.state.counter < 3 ){
        
        var dataComesFromAmazon = [
            {
                "index" : "1",
                "name"  : "11239h1j2n3jh123u1y"
    
            }
        ]
        var beforeVpnCred = [...this.state.vpnCreds];
        beforeVpnCred.push(dataComesFromAmazon[0]);

         this.setState({
             vpnCreds : beforeVpnCred
         })
         this.state.counter++;
         
    }
    }
    
    render() {
       
        return(
            <div className= "credential-container">
                 <CCard>
                    <CCardHeader>
                      VPN Credentials
                    </CCardHeader>
                        
                        <CCardBody>
                        <div className="credentialTable">
                        <ul>
                            <li>#</li>
                            <li className="name">Name</li>
                            
                            <i onClick={this.onaddCredential} className="fas fa-plus-square plusicon"/>
                            </ul>

                            {
                                this.state.vpnCreds.map((vpnCreds) => {
                                    return (
                                        <CredentialCard 
                                        index= {vpnCreds.index}
                                        name = {vpnCreds.name}
                                        />
                                    )
                                })
                            }
                            </div>
                            </CCardBody>
                  
                  </CCard>
                      
            </div>

        )
    }

    
}

export default Credentials;