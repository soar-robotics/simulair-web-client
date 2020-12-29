import React,{Component} from 'react';

class RobotCard extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return(

            <div className="robot-card-holder">
                <div className="robot-index">
                <span>1</span>
                </div>
                    <div className="robot-icon">
                <img src="https://www.locopoco.com/ProductImages/120657/big/39989_silverlit-program-a-bot-robot_2.jpg"/>
                    </div>
                        <div className="robot-type">
                        <span>delivery-bot 1</span>
                        </div>
                            <div className="robot-type">
                            <span>tahameg</span>
                            </div>
                            
                            <i className="fas fa-edit"/>
                            
                            <i className="fas fa-trash-alt"/>
                 
            </div>
        )
    }

    
}

export default RobotCard;