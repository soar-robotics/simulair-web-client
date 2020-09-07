import React, {Component} from 'react';
import simulationImg from 'assets/img/simulation_placeholder.png';
import Button from "../common/Button";

class SimulationCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {id, name, status, thumbnail, description} = this.props;

        return (
            <div className='simulation-card'>
                <div className='top'>
                    <div className='heading'>
                        <span>{name}, {status}</span>
                    </div>
                </div>
                <div className='main'>
                    <div className='left'>
                        <div className='img-holder'>
                            <img src={simulationImg}/>
                        </div>
                    </div>
                    <div className='middle'>
                        <div className='heading'>
                            <span>{name}</span>
                        </div>
                        <p>
                            {description}
                        </p>
                    </div>
                    <div className='right'>
                        <Button type="primary" size="sm" icon>Run</Button>
                        <Button type="primary" size="sm" outline icon>Stop</Button>
                        <Button type="primary" size="sm" outline icon>View</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SimulationCard;