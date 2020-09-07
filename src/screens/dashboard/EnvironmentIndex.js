import React, {Component, Fragment} from 'react';
import queryString from "query-string";
import {environments as environmentsData} from "../../config/sample-data";
import * as constants from "../../config/constants/environments";
import ButtonIcon from "../../components/common/ButtonIcon";
import Divider from "../../components/common/Divider";
import EnvironmentCard from "../../components/dashboard/EnvironmentCard";
import ActionBar from "../../components/ActionBar";

class EnvironmentIndex extends Component {
    constructor(props) {
        super(props);

        const {search} = queryString.parse(this.props.location.search);

        this.state = {
            environments: environmentsData,
            display: 'grid',
            filters: {
                [constants.FILTER_TYPES.SEARCH]: search || ''
            }
        }

        this.initialSearch = search;
    }

    componentDidMount() {
        const environments = this.getEnvironments();
        this.setState({environments: environments});
    }

    getEnvironments() {
        return environmentsData;
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

    changeDisplay(display) {
        this.setState({display});
    }

    renderEnvironments() {
        return this.state.environments.map((environment) => {
            const {id, name, thumbnail, description} = environment;

            return (
                <EnvironmentCard {...{key: id, id, name, thumbnail, description}}/>
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
        console.log(this.state);
        return (
            <Fragment>
                <ActionBar initialSearch={this.initialSearch} onSearchSubmit={this.applySearch}>
                    {this.renderActionButtons()}
                </ActionBar>

                <Divider spacing={70}/>

                <div className={`environments-content ${(this.state.display === 'grid') ? 'grid' : 'list-display'}`}>
                    <div className='environments-holder'>
                        {this.renderEnvironments()}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default EnvironmentIndex;