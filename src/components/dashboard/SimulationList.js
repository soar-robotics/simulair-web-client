import React, {Component} from 'react';
import SimulationCard from "./SimulationCard";
import _ from "lodash";
import FlipMove from "react-flip-move";
import * as constants from "../../config/constants/simulations";

class SimulationList extends Component {
    handleStatusUpdate = (id, status) => {
        const simulations = [...this.props.simulations];
        const simulation = _.find(simulations, sim => {
            return sim.id === id;
        });

        if (status !== this.props.filters['status']) {
            const index = simulations.findIndex(s => s.id === simulation.id);
            const filteredSimulations = _.filter(simulations, simulation => simulation.id !== id);
            this.props.onStatusUpdate(filteredSimulations, simulation, status, index);
        }
    }

    render() {
        return (
            <FlipMove leaveAnimation="elevator">
                {this.props.simulations.map((simulation) => {
                    const {id, name, status, thumbnail, description} = simulation;

                    return (
                        <SimulationCard onStatusUpdate={this.handleStatusUpdate}
                                        onToggleOpen={(id) => this.props.onToggleOpen(id)}
                                        opened={this.props.openedSimulation === simulation.id}
                                        {...{key: id, id, name, status, thumbnail, description}}
                        />
                    );
                })}
            </FlipMove>
        )
    }
}

export default SimulationList;