import React,{Component} from 'react';

class CredentialCard extends Component {
    constructor(props){
        super(props);

    }

    render() {
        const {index,name} = this.props;

        return(

            <div className="credential-card-holder">
                <div className="credential-index">
                <span>{index}</span>
                </div>
                    <div className="credential-name">
                    <span>{name}</span>
                    </div>   
                    <i className="fas fa-download"/>
                 
            </div>
        )
    }

    
}

export default CredentialCard;