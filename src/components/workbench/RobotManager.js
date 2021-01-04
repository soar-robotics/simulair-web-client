import React,{Component} from 'react';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CDropdown,
    CDropdownMenu,
    CDropdownToggle,
    CDropdownItem

}from '@coreui/react';
import RobotCard from './RobotCard';
import ControlService from '../../services/ControlService';

class RobotManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRobots:[],
            simulationRobots: [],

        }
    }

    componentDidMount() {
        const robots = [{
        'index':'1',
        'image':'https://www.locopoco.com/ProductImages/120657/big/39989_silverlit-program-a-bot-robot_2.jpg',
        'type' :'DeliveryRobot1',
        'owner':'Tahameg'
     },
     {
        'index':'2',
        'image':'https://cdn03.ciceksepeti.com/cicek/kc9188618-1/XL/transformers-arabaya-donusen-robot-kc9188618-1-7160c889e9664236ae241781d75ff5f6.jpg',
        'type' :'DeliveryRobot2',
        'owner':'Hakan'
     }
    ]
        this.setState({
            userRobots: robots
        });

        

    }
    onRobotSelect = (e) => {
        
       var indexValueofRobot = e.target.getAttribute("value");

       var selectedRobot = this.state.userRobots.filter((robots) => {
            return robots.index == indexValueofRobot
       })[0]
       

       let newSimArray = [...this.state.simulationRobots]

       newSimArray.push(selectedRobot);
       

       console.log(newSimArray);

       this.setState({
        simulationRobots : newSimArray
       });

    }

    updateRobotName = (name) => {
        ControlService.setClient(this.props.connection)
    }
    render() {
        console.log(this.state.simulationRobots)
        return(
            
            <div className="robotCard">
            
                <CCard>
                    <CCardHeader>
                        Robots
                    </CCardHeader>
                        
                        <CCardBody>
                        <div className="robotTable">
                        <ul>
                            <li>#</li>
                            <li>Icon</li>
                            <li>Type</li>
                            <li>Owner</li>
                            <CDropdown className="addRobotDropdown" size="sm">
                            
                                <CDropdownToggle>
                                <i className="fas fa-plus-square plusicon"/>
                                </CDropdownToggle>
                            <CDropdownMenu>
                                {this.state.userRobots.map((robots,index) => {
                                    return (
                                        <CDropdownItem key={index} value={robots.index} onClick={this.onRobotSelect}>{robots.type}</CDropdownItem>
                                    )
                                })
                                
                                
                                }
                                

                            </CDropdownMenu>
                            </CDropdown>
                            
                        </ul>
                        {
                            this.state.simulationRobots.map((robots) => {
                                console.log(robots)
                              return  <RobotCard 
                                key= {robots.index}
                                index={robots.index} 
                                icon={robots.image} 
                                type={robots.type}
                                owner={robots.owner} />
                            })
                        }
                        
                        </div>
                        </CCardBody>
                  
                </CCard>
                </div>
        )
    }
}

export default RobotManager;