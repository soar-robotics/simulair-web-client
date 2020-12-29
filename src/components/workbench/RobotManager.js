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

class RobotManager extends Component {
    constructor(props) {
        super(props);
        
    }


    render() {
        
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

                                <CDropdownItem>Action</CDropdownItem>

                            </CDropdownMenu>
                            </CDropdown>
                            
                        </ul>

                        <RobotCard />
                        </div>
                        </CCardBody>
                  
                </CCard>
                </div>
        )
    }
}

export default RobotManager;