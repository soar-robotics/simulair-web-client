import '../assets/scss/app.scss';

import React from 'react';
import {Router, Route, Switch} from "react-router-dom";
import {authTypes} from '../store/actions/types';
import {createBrowserHistory} from 'history';
import {Container} from "react-bootstrap";
import Login from '../screens/auth/Login';
import Dashboard from '../screens/dashboard';

const history = createBrowserHistory();

function App() {
    return (
        <Container fluid className="main-wrapper">
            <Router history={history}>
                <Switch>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Login}/>
                    <Route path="/app" component={Dashboard}/>
                </Switch>
            </Router>
        </Container>
    );
}

export default App;
