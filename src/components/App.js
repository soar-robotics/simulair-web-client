import '../assets/scss/app.scss';

import React from 'react';
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {toast} from 'react-toastify';
import {authTypes} from '../store/actions/types';
import {createBrowserHistory} from 'history';
import {Container} from "react-bootstrap";
import Login from '../screens/auth/Login';
import Dashboard from '../screens/dashboard';
import ProtectedRoute from "./auth/ProtectedRoute";
import GuestRoute from "./auth/GuestRoute";
import queryString from "query-string";
import AuthService from "../services/AuthService";
import Register from "../screens/auth/Register";
import SimulationWorkshop from '../screens/dashboard/SimulationWorkshop';

const history = createBrowserHistory();

toast.configure({
    autoClose: 4000,
    position: toast.POSITION.TOP_RIGHT
});

function App(props) {
    const handleGoogleCallback = (props) => {
        const codeWithScope = props.location.search;

        if (!codeWithScope) {
            return props.history.push('/app');
        }

        const params = queryString.parse(codeWithScope);

        AuthService.postGoogleLogin(params.code, params.scope)
            .then((response) => {
                console.log(response);
                props.history.push("/app");
                toast.success(`Logged in successfully!`);
            })
            .finally(() => {

            });
    }

    return (
        <Container fluid className="main-wrapper">
            <Router history={history}>
                <Switch>
                    <GuestRoute path="/login" exact component={Login}/>
                    <GuestRoute path="/login/oauth/google/callback" exact>
                        {props => {
                            handleGoogleCallback(props)
                        }}
                    </GuestRoute>
                    <GuestRoute path="/register" exact component={Register}/>
                    <ProtectedRoute path="/app" component={Dashboard}/>
                    <ProtectedRoute path="/simulationrender" component={SimulationWorkshop}/>
                    <Redirect to={`/login`}/>
                </Switch>
            </Router>
        </Container>
    );
}

export default App;
