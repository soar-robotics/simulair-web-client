import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import {toast} from "react-toastify";
import queryString from 'query-string';
import _ from 'lodash';
import Divider from "../../components/common/Divider";
import ActionBar from "../../components/ActionBar";
import * as constants from 'config/constants/simulations';
import SimulationCreate from "./SimulationCreate";
import SimulationService from "../../services/SimulationService";
import LoadingBox from "../../components/common/LoadingBox";
import SimulationList from "../../components/dashboard/SimulationList";
import Button from "../../components/common/Button";
import UserProfileEdit from "./UserProfileEdit";

class SimulationIndex extends Component {
    constructor(props) {
        super(props);

        const {status, search} = this.getFiltersFromQueryString();

        this.initialSearch = search;

        this.state = {
            isFetching: false,
            simulations: [],
            openedSimulation: null,
            filters: {
                status: status || 'running',
                search: search || ''
            },
            showSimulationCreate: false
        }
    }

    componentDidMount() {
        this.getSimulations();
        this.interval = setInterval(() => {
            this.getSimsInterval();
        }, 3000);
        }

        

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {status, search} = this.getFiltersFromQueryString();
        const {location} = this.props;

        // set state values based on change in query string due to navigation
        if ((location.search !== prevProps.location.search) &&
            (location.pathname === prevProps.location.pathname)) {
            this.setState({
                filters: {
                    status: status || 'running',
                    search: search || ''
                }
            })
        }

        if (!_.isEqual(prevState.filters, this.state.filters)) {
            this.getSimulations();
        }
    }

    getSimulations() {
        const {status, search} = this.state.filters;

        this.setState({
            isFetching: true
        });
        SimulationService.getSimulations(status, search)
            .then((response) => {
                this.setState({
                    simulations: response.data,
                    openedSimulation: (response.data[0]) ? response.data[0].id : null
                });
            })
            .finally(() => {
                this.setState({
                    isFetching: false
                });
            });
    }

        getSimsInterval(){
            const {status, search} = this.state.filters;

            this.state.simulations.map((item) => {
                if(item.status === 'pending1' || item.status === 'pending2' || item.status === 'pending3'){
                         
                SimulationService.getSimulations(status, search)
                .then((response) => {
                    this.setState({
                        simulations: response.data
                    });
                console.log(response.data)
                }).catch(err => {console.log(err)});
                }
            });
            
           

        }

    getFiltersFromQueryString() {
        const filters = queryString.parse(this.props.location.search);
        return {status: filters.status, search: filters.search};
    }

    setFilter(filterType, value) {
        const query = queryString.stringify({
            ...queryString.parse(this.props.location.search),
            [filterType]: value
        });

        this.props.history.push({
            pathname: this.props.location.path,
            search: query
        });
        this.setState(prevState => ({filters: {...prevState.filters, [filterType]: value}}));
    }

    applySearch = (value) => {
        this.setFilter('search', value);
    }

    showSimulationCreate = () => {
        return <SimulationCreate
            onExited={() => this.setState({showSimulationCreate: false})}
            onCreated={this.handleSimulationCreated}
        />;
    }

    toggleSimulationOpen = (id) => {
        this.setState({openedSimulation: (id === this.state.openedSimulation) ? null : id});
    }

    handleSimulationCreated = (simulation) => {
        this.getSimulations();
    }

    handleStatusUpdate = (filteredSimulations, updatedSimulation, status, index) => {
        this.setState({simulations: filteredSimulations});

        // toggle (open) next simulation card after removing the current one from the list
        if (this.state.simulations[index]) {
            this.toggleSimulationOpen(this.state.simulations[index].id);
        }

        toast.info(`Status set to "${status}" for simulation ${updatedSimulation.name}.`);
    }

    handleToggleOpen = (id) => {
        this.toggleSimulationOpen(id);
    }

    renderActionButtons() {
        return (
            <Fragment>
                <Button type="tertiary" size="lg"
                        outline={(this.state.filters.status !== 'running')}
                        icon='fas fa-play'
                        onClick={() => this.setFilter('status', 'running')}
                >
                    Runs
                </Button>
                <Button type="tertiary" size="lg"
                        outline={(this.state.filters.status !== 'stopped')}
                        icon='fas fa-align-left'
                        onClick={() => this.setFilter('status', 'stopped')}
                >
                    History
                </Button>
                <Button type="secondary" size="lg" outline icon='fas fa-plus'
                        onClick={() => this.setState({showSimulationCreate: true})}
                >
                    New
                </Button>
            </Fragment>
        );
    }

    render() {
        return (
            <Fragment>
                <ActionBar initialSearch={this.initialSearch} onSearchSubmit={this.applySearch}>
                    {this.renderActionButtons()}
                </ActionBar>

                <div className='simulations-content'>
                    {(this.state.filters.status === 'running') &&
                    <h1>Active Instances</h1>
                    }
                    {(this.state.filters.status === 'stopped') &&
                    <h1>Stopped Instances</h1>
                    }
                    <div className='simulations-holder'>
                        {(this.state.isFetching) &&
                        <LoadingBox/>
                        }
                        {(!this.state.isFetching) &&
                        <SimulationList
                            simulations={this.state.simulations}
                            openedSimulation={this.state.openedSimulation}
                            filters={this.state.filters}
                            onStatusUpdate={this.handleStatusUpdate}
                            onToggleOpen={this.handleToggleOpen}
                        />
                        }
                    </div>
                </div>

                {(this.state.showSimulationCreate) ? this.showSimulationCreate() : null}
            </Fragment>
        );
    }
}

export default SimulationIndex;