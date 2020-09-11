import React, {Component} from 'react';
import SimulationCard from "./SimulationCard";
import _ from "lodash";
import * as constants from "../../config/constants/simulations";
import {toast} from "react-toastify";

class SimulationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            simulations: this.props.simulations || [],
            openedSimulation: null
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.simulations !== this.props.simulations) {
            this.setState({simulations: this.props.simulations});
        }
    }

    updateSimulationStatus = (id, status) => {
        const simulations = {...this.state.simulations};
        const simulation = _.find(simulations, sim => {
            return sim.id === id;
        });

        if (status !== this.props.filters[constants.FILTER_TYPES.STATUS]) {
            this.setState({simulations: _.filter(simulations, simulation => simulation.id !== id)});

            toast.info(`Status set to "${status}" for simulation ${simulation.name}.`);
        }
    }

    toggleSimulationOpen = (id) => {
        this.setState({openedSimulation: (id === this.state.openedSimulation) ? null : id});
    }

    handleStatusUpdate = (id, status) => {
        this.updateSimulationStatus(id, status);
    }

    handleToggleOpen = (id) => {
        this.toggleSimulationOpen(id);
    }

    renderList() {
        /*return (
            <TransitionGroup {...{
                appear: false,
                enter: true,
                exit: true
            }}>
                {this.state.simulations.map((simulation) => {
                    const {id, name, status, thumbnail, description} = simulation;

                    return (
                        <Fade key={id} when={false} duration={600} collapse bottom>
                            <SimulationCard onStatusUpdate={this.updateSimulationStatus} {
                                ...{key: id, id, name, status, thumbnail, description}
                            }/>
                        </Fade>
                    );
                })}
            </TransitionGroup>
        )*/
    }

    render() {
        return this.state.simulations.map((simulation, i) => {
            const {id, name, status, thumbnail, description} = simulation;

            return (
                <SimulationCard onStatusUpdate={this.handleStatusUpdate}
                                onToggleOpen={this.handleToggleOpen}
                                opened={this.state.openedSimulation === simulation.id}
                                {...{key: id, id, name, status, thumbnail, description}}
                />
            );
        });
    }
}

export default SimulationList;