import React, {Component, Fragment} from 'react';
import simulationImg from 'assets/img/simulation_placeholder.png';
import Button from "../common/Button";
import {BeatLoader} from "react-spinners";
import TextLoadingIcon from "../common/TextLoadingIcon";
import LoadingBox from "../common/LoadingBox";
import SimulationService from "../../services/SimulationService";
import {Fade} from "react-reveal";
import ButtonIcon from "../common/ButtonIcon";

class SimulationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdating: false
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    changeStatus(id, status) {
        this.setState({
            isUpdating: true
        });
        SimulationService.patchSimulationStatus(id, status)
            .then((response) => {
                this.props.onStatusUpdate(id, status);
            })
            .finally(() => {
                this.setState({
                    isUpdating: false
                });
            });
    }

    toggleOpen = () => {
        this.props.onToggleOpen(this.props.id);
    }

    render() {
        const {id, name, status, thumbnail, description, opened} = this.props;
        const {isOpened} = this.state;
        console.log('CARD RENDER');

        return (
            <div className='simulation-card-holder'>
                <div className='simulation-card'>
                    {(this.state.isUpdating) &&
                    <LoadingBox hasBackdrop/>
                    }
                    <div className='top'>
                        <div className='heading'>
                            <span>{name}, {status}</span>
                        </div>
                        <div className='btn-holder'>
                            <ButtonIcon type="tertiary" size="sm" onClick={this.toggleOpen}>
                                <i className={`fas fa-caret-${(opened) ? 'down' : 'right'} fa-2x`}/>
                            </ButtonIcon>
                        </div>
                    </div>
                    <div className={`main ${(!opened) ? 'hidden' : 'shown'}`}>
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
                            <Button type="primary" size="sm" icon
                                    onClick={() => this.changeStatus(id, 'running')}>
                                Run
                            </Button>
                            <Button type="primary" size="sm" outline icon
                                    onClick={() => this.changeStatus(id, 'stopped')}>
                                Stop
                            </Button>
                            <Button type="primary" size="sm" outline icon>View</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SimulationCard;