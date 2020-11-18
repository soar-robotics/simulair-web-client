import React, {Component} from 'react';
import {Collapse} from "react-bootstrap";
import simulationImg from 'assets/img/simulation_placeholder.png';
import Button from "../common/Button";
import LoadingBox from "../common/LoadingBox";
import SimulationService from "../../services/SimulationService";
import ButtonIcon from "../common/ButtonIcon";

class SimulationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdating: false
        }
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

    //  deleteSimulation(id){
    //     this.setState({
    //         isUpdating: true
    //     });
    //     SimulationService.deleteSimulation(id)
    //         .then(response => {
    //         console.log(response);
    //         })
    //         .finally(() => {
    //             this.setState({
    //                 isUpdating: false
    //             });
    //         });
    // }

    toggleOpen = () => {
        this.props.onToggleOpen(this.props.id);
    }

    render() {
        const {id, name, status, thumbnail, description, opened} = this.props;

        return (
            <div className='simulation-card-holder'>
                <div className='simulation-card'>
                    {(this.state.isUpdating) &&
                    <LoadingBox hasBackdrop/>
                    }
                    <div className='top' onClick={this.toggleOpen}>
                        <div className='heading'>
                            <span>{name}, {status}</span>
                        </div>
                        <div className='btn-holder'>
                            <ButtonIcon type="tertiary" size="sm">
                                <i className={`fas fa-caret-${(opened) ? 'down' : 'right'} fa-2x`}/>
                            </ButtonIcon>
                        </div>
                    </div>
                    <Collapse in={opened}>
                        <div>
                            <div className={`main`}>
                                <div className='left'>
                                    <div className='img-holder'>
                                        <img src={thumbnail} alt=''/>
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
                                    <Button type="primary" size="sm" icon='fas fa-play'
                                            onClick={() => this.changeStatus(id, 'running')}>
                                        Run
                                    </Button>
                                    <Button type="primary" size="sm" outline icon='fas fa-minus-circle'
                                            onClick={() => this.changeStatus(id, 'stopped')}>
                                        Delete
                                    </Button>
                                    <Button type="primary" size="sm" outline icon='fas fa-eye'>View</Button>
                                </div>
                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>
        );
    }
}

export default SimulationCard;