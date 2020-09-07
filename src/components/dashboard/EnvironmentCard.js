import React, {Component} from 'react';

class EnvironmentCard extends Component {
    render() {
        const {id, name, thumbnail, description} = this.props;

        return (
            <div className='environment-card'>
                <div className='top'>
                    <img src={thumbnail}/>
                </div>
                <div className='main'>
                    <div className='heading'>
                        <span>{name}</span>
                    </div>
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        );
    }
}

export default EnvironmentCard;