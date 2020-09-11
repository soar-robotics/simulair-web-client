import {simulations as simulationsData} from "../../config/sample-data";

import React, {Component, Fragment} from 'react';
import CSSTransition from 'react-transition-group';
import _ from 'lodash';
import Button from "../../components/common/Button";
import ButtonIcon from "../../components/common/ButtonIcon";
import InputText from "../../components/common/InputText";
import SimulationCard from "../../components/dashboard/SimulationCard";
import Divider from "../../components/common/Divider";
import ActionBar from "../../components/ActionBar";
import {Link, Route, Switch, Redirect, generatePath} from "react-router-dom";
import queryString from 'query-string';
import * as constants from 'config/constants/simulations';
import SimulationCreate from "./SimulationCreate";
import {BeatLoader} from "react-spinners";
import SimulationService from "../../services/SimulationService";
import LoadingBox from "../../components/common/LoadingBox";
import {toast} from "react-toastify";
import Fade from 'react-reveal/Fade';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import SimulationList from "../../components/dashboard/SimulationList";

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
                [constants.FILTER_TYPES.STATUS]: status || constants.TYPES.RUNNING,
                [constants.FILTER_TYPES.SEARCH]: search || ''
            }
        }
    }

    componentDidMount() {
        this.getSimulations(this.state.filters[constants.FILTER_TYPES.STATUS], this.state.filters[constants.FILTER_TYPES.SEARCH]);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {status, search} = this.getFiltersFromQueryString();
        const {location} = this.props;

        // set state values based on change in query string due to navigation
        if ((location.search !== prevProps.location.search) &&
            (location.pathname === prevProps.location.pathname)) {
            this.setState({
                filters: {
                    [constants.FILTER_TYPES.STATUS]: status || constants.TYPES.RUNNING,
                    [constants.FILTER_TYPES.SEARCH]: search || ''
                }
            })
        }

        if (!_.isEqual(prevState.filters, this.state.filters)) {
            this.getSimulations(this.state.filters[constants.FILTER_TYPES.STATUS], this.state.filters[constants.FILTER_TYPES.SEARCH]);
        }
    }

    getSimulations(status, search) {
        this.setState({
            isFetching: true
        });
        SimulationService.getSimulations(status, search)
            .then((response) => {
                this.setState({
                    simulations: response.data
                });
                this.toggleSimulationOpen(response.data[0].id);
            })
            .finally(() => {
                this.setState({
                    isFetching: false
                });
            });
    }

    getModalCreate = () => {
        this.props.history.push(`${this.props.match.url}/create`);
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
        this.setFilter(constants.FILTER_TYPES.SEARCH, value);
    }

    updateSimulationStatus = (id, status) => {
        const simulations = {...this.state.simulations};
        const simulation = _.find(simulations, sim => {
            return sim.id === id;
        });

        if (status !== this.state.filters[constants.FILTER_TYPES.STATUS]) {
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

    renderSimulations() {
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

    renderActionButtons() {
        return (
            <Fragment>
                <Button type="tertiary" size="lg"
                        outline={(this.state.filters.status !== constants.TYPES.RUNNING)}
                        icon
                        onClick={() => this.setFilter(constants.FILTER_TYPES.STATUS, constants.TYPES.RUNNING)}
                >
                    Runs
                </Button>
                <Button type="tertiary" size="lg"
                        outline={(this.state.filters.status !== constants.TYPES.STOPPED)}
                        icon
                        onClick={() => this.setFilter(constants.FILTER_TYPES.STATUS, constants.TYPES.STOPPED)}
                >
                    History
                </Button>
                <Button type="secondary" size="lg" outline icon onClick={this.getModalCreate}>New</Button>
            </Fragment>
        );
    }

    render() {
        console.log('INDEX RENDER');
        return (
            <Fragment>
                <ActionBar initialSearch={this.initialSearch} onSearchSubmit={this.applySearch}>
                    {this.renderActionButtons()}
                </ActionBar>

                <Divider spacing={70}/>

                <div className='simulations-content'>
                    {(this.state.filters.status === constants.TYPES.RUNNING) &&
                    <h1>Active Instances</h1>
                    }
                    {(this.state.filters.status === constants.TYPES.STOPPED) &&
                    <h1>Stopped Instances</h1>
                    }
                    <div className='simulations-holder'>
                        {(this.state.isFetching) &&
                        <LoadingBox/>
                        }
                        {(!this.state.isFetching) &&
                        <SimulationList simulations={this.state.simulations} filters={this.state.filters}/>
                        }
                    </div>
                </div>
                <Switch>
                    <Route path={`${this.props.match.path}/create`} component={SimulationCreate}/>
                </Switch>
            </Fragment>
        );
    }
}

export default SimulationIndex;