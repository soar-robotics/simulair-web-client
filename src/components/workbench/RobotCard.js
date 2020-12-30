import React,{Component} from 'react';

class RobotCard extends Component {
    constructor(props){
        super(props);

    }

    render() {
        const {index,icon,type,owner} = this.props;
        console.log("Card"+this.props.index)
        return(

            <div className="robot-card-holder">
                <div className="robot-index">
                <span>{index}</span>
                </div>
                    <div className="robot-icon">
                <img src={icon}/>
                    </div>
                        <div className="robot-type">
                        <span>{type}</span>
                        </div>
                            <div className="robot-owner">
                            <span>{owner}</span>
                            </div>
                            
                            <i className="fas fa-edit"/>
                            
                            <i className="fas fa-trash-alt"/>
                 
            </div>
        )
    }

    
}

export default RobotCard;