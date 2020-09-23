import React, {Component, Fragment} from 'react';
import queryString from "query-string";
import {environments as environmentsData} from "../../config/sample-data";
import * as constants from "../../config/constants/environments";
import ButtonIcon from "../../components/common/ButtonIcon";
import Divider from "../../components/common/Divider";
import DefaultProductCard from "../../components/dashboard/DefaultProductCard";
import ActionBar from "../../components/ActionBar";
import SimulationService from "../../services/SimulationService";
import EnvironmentService from "../../services/EnvironmentService";
import _ from "lodash";
import RobotService from "../../services/RobotService";
import LoadingBox from "../../components/common/LoadingBox";

class RobotIndex extends Component {
    constructor(props) {
        super(props);

        const {search} = this.getFiltersFromQueryString();

        this.state = {
            robots: [],
            display: 'grid',
            filters: {
                search: search || ''
            },
            isFetching: false
        }

        this.initialSearch = search;
    }

    componentDidMount() {
        this.getRobots();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {search} = this.getFiltersFromQueryString();
        const {location} = this.props;

        // set state values based on change in query string due to navigation
        if ((location.search !== prevProps.location.search) &&
            (location.pathname === prevProps.location.pathname)) {
            this.setState({filters: {search: search || ''}})
        }

        if (!_.isEqual(prevState.filters, this.state.filters)) {
            this.getRobots();
        }
    }

    getRobots() {
        const {search} = this.state.filters;

        this.setState({
            isFetching: true
        });
        RobotService.getRobots(search)
            .then((response) => {
                this.setState({
                    robots: response.data
                });
            })
            .finally(() => {
                this.setState({
                    isFetching: false
                });
            });
    }

    getFiltersFromQueryString() {
        const filters = queryString.parse(this.props.location.search);
        return {search: filters.search};
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

    changeDisplay(display) {
        this.setState({display});
    }

    renderRobots() {
        return this.state.robots.map((robot) => {
            const {id, name, thumbnail, description} = robot;

            return (
                <DefaultProductCard {...{key: id, id, name, thumbnail, description}}/>
            );
        });
    }

    renderActionButtons() {
        return (
            <Fragment>
                <ButtonIcon type="primary" size="lg" outline={this.state.display !== 'grid'} onClick={() => this.changeDisplay('grid')}>
                    <i className="fas fa-th-large"/>
                </ButtonIcon>
                <ButtonIcon type="primary" size="lg" outline={this.state.display !== 'list'} onClick={() => this.changeDisplay('list')}>
                    <i className="fas fa-list-ul"/>
                </ButtonIcon>
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

                <div className={`default-product-content ${(this.state.display === 'grid') ? 'grid' : 'list-display'}`}>
                    <div className='default-product-holder'>
                        {(this.state.isFetching) &&
                        <LoadingBox/>
                        }
                        {(!this.state.isFetching) &&
                        this.renderRobots()
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default RobotIndex;