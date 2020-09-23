import React, {Component} from 'react';
import simulationImg from 'assets/img/simulation_placeholder.png';

class DefaultProductCard extends Component {
    render() {
        const {id, name, thumbnail, description} = this.props;

        return (
            <div className='default-product-card'>
                <div className='top'>
                    <img src={thumbnail} alt=''/>
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

export default DefaultProductCard;