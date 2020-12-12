import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAuthUser} from "../../store/actions";
import SimulationIndex from "./SimulationIndex";
import EnvironmentIndex from "./EnvironmentIndex";
import RobotIndex from "./RobotIndex";
import SimulationRender from "./SimulationRender";
import Sidebar from "../../components/dashboard/Sidebar";
import AuthService from "../../services/AuthService";
import SimulationService from "../../services/SimulationService";
import _ from "lodash";

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // initialize currently authenticated user in global state
        this.props.fetchAuthUser();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        const {path} = this.props.match;

        return (
            <div className='dashboard-container'>
                
                <Sidebar {...this.props} />

                <div className='dashboard-content'>
                    <div className='container-fluid content-container'>
                        <Switch>
                            <Route path={`${path}/simulations`} component={SimulationIndex}/>
                            <Route path={`${path}/environments`} component={EnvironmentIndex}/>
                            <Route path={`${path}/robots`} component={RobotIndex}/>
                            <Route path={`${path}/simulationrender`} component={SimulationRender}/>
                            <Redirect from={path} to={`${path}/simulations`}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {authUser: state.auth.user};
};

export default connect(mapStateToProps, {fetchAuthUser})(Dashboard);