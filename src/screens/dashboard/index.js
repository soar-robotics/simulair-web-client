import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import SimulationIndex from "./SimulationIndex";
import EnvironmentIndex from "./EnvironmentIndex";
import RobotIndex from "./RobotIndex";
import Sidebar from "../../components/dashboard/Sidebar";

class Dashboard extends Component {
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
                            <Redirect from={path} to={`${path}/simulations`}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;