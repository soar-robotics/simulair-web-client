import {simulations as simulationsData} from "../../config/sample-data";

import React, {Component, Fragment} from 'react';
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

class SimulationIndex extends Component {
    constructor(props) {
        super(props);

        const {status, search} = queryString.parse(this.props.location.search);

        this.state = {
            simulations: simulationsData,
            filters: {
                [constants.FILTER_TYPES.STATUS]: status || constants.TYPES.RUNNING,
                [constants.FILTER_TYPES.SEARCH]: search || ''
            }
        }

        this.initialSearch = search;

        console.log(this.props);
    }

    componentDidMount() {
        const simulations = this.getSimulations();
        this.setState({simulations: simulations});
    }

    getSimulations() {
        return simulationsData;
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

    getModalCreate =() => {
        console.log(this.props);
        this.props.history.push(`${this.props.match.url}/create`);
    }

    renderSimulations() {
        return this.state.simulations.map((simulation) => {
            const {id, name, status, thumbnail, description} = simulation;

            if (this.state.filters.status) {
                return (status === this.state.filters.status) ?
                    <SimulationCard {...{key: id, id, name, status, thumbnail, description}}/> : null;
            }

            return (
                <SimulationCard {...{key: id, id, name, status, thumbnail, description}}/>
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
                        {this.renderSimulations()}
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