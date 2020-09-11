import React, {Component} from 'react';
import {Container, Form} from 'react-bootstrap';
import Button from 'components/common/Button';
import Divider from 'components/common/Divider';

import styles from './Login.module.scss';
import logoImg from 'assets/img/logo.png';
import googleImg from 'assets/img/google.png';
import {Link} from "react-router-dom";
import InputText from "../../components/common/InputText";
import AuthService from 'services/AuthService';
import TextLoadingIcon from "../../components/common/TextLoadingIcon";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginInProgress: false,
            email: '',
            password: '',
            message: ''
        };
    }

    componentDidMount() {
        console.log("req sent");
        //this.login();
        //this.logout();
    }

    login() {
        AuthService.login('test@lubarto.com', 'password').then((response) => {
            console.log(response);
        }).catch(error => {
            console.log('err')
        });
    }

    logout() {
        AuthService.logout().then((response) => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    handleLogin = (e) => {
        this.setState({loginInProgress: true});

        AuthService.login('lukabartolic11@gmail.com', 'password').then((response) => {
            console.log(response);
            this.setState({loginInProgress: false});
            this.props.history.push("/app");
        }).catch(error => {
            console.log(error);
        });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className={styles.vCenter}>
                <Container className={styles.wrapper}>
                    <Container className={styles.content}>
                        <div className={styles.logo}>
                            <img src={logoImg} alt=''/>
                        </div>
                        <Divider spacing={45}/>
                        <Form.Group className={styles.inputBox}>
                            <Form.Label>Email</Form.Label>
                            <InputText type="bordered" inputType="email" placeholder="Enter email"/>
                        </Form.Group>
                        <Divider spacing={20}/>
                        <Form.Group className={styles.inputBox}>
                            <Form.Label>Password</Form.Label>
                            <InputText type="bordered" inputType="password" placeholder="Enter password"/>
                        </Form.Group>
                        <Divider spacing={25}/>
                        <Form.Group className={`${styles.inputBox} ${styles.remember}`} controlId="rememberMe">
                            <Form.Check custom type="checkbox" label="Remember me"/>
                        </Form.Group>
                        <Divider spacing={50}/>
                        <Button type="primary" size="lg" outline className={`_center-block`}
                                onClick={this.handleLogin}
                                disabled={this.state.loginInProgress}
                        >
                            {this.state.loginInProgress && (
                                <TextLoadingIcon/>
                            )}
                            Login
                        </Button>
                        <Divider spacing={45}/>
                        <div className={styles.providersHolder}>
                            <p>or login with</p>
                            <div className={styles.list}>
                                <div className={styles.item}>
                                    <img src={googleImg}/>
                                </div>
                            </div>
                        </div>
                        <Divider spacing={50}/>
                        <p className={styles.register}>Not a member? <a href='#'>Sign up now!</a></p>
                    </Container>
                </Container>
            </div>
        );
    }
}

export default Login;