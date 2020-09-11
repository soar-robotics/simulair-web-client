import '../assets/scss/app.scss';

import React from 'react';
import {Router, Route, Switch, Redirect} from "react-router-dom";
import { toast } from 'react-toastify';
import {authTypes} from '../store/actions/types';
import {createBrowserHistory} from 'history';
import {Container} from "react-bootstrap";
import Login from '../screens/auth/Login';
import Dashboard from '../screens/dashboard';
import ProtectedRoute from "./auth/ProtectedRoute";
import GuestRoute from "./auth/GuestRoute";

const history = createBrowserHistory();

toast.configure({
    autoClose: 4000,
    position: toast.POSITION.TOP_RIGHT
});

function App() {
    return (
        <Container fluid className="main-wrapper">
            <Router history={history}>
                <Switch>
                    <GuestRoute path="/login" exact component={Login}/>
                    <GuestRoute path="/register" exact component={Login}/>
                    <ProtectedRoute path="/app" component={Dashboard}/>
                    <Redirect to={`/login`}/>
                </Switch>
            </Router>
        </Container>
    );
}

export default App;
