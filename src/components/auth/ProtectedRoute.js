import React, {Component} from 'react';
import AuthService from "../../services/AuthService";
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    console.log(rest);

    const isUserLoggedIn = () => {
        if (AuthService.getCurrentUser()) {
            return true;
        }
        return false;
    }

    return (
        (isUserLoggedIn()) ?
            <Route component={Component} {...rest}/>
            :
            <Redirect
                to={{
                    pathname: "/login"
                }}
            />
    );
}

export default ProtectedRoute;