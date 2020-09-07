import React, {Component} from 'react';
import {Container, Form} from 'react-bootstrap';
import Button from 'components/common/Button';
import Divider from 'components/common/Divider';

import styles from './Login.module.scss';
import logoImg from 'assets/img/logo.png';
import googleImg from 'assets/img/google.png';
import {Link} from "react-router-dom";
import InputText from "../../components/common/InputText";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: false
        };
    }

    componentDidMount() {
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
                        <Link to='/app'>
                            <Button type="primary" size="lg" outline className={`_center-block`}>Login</Button>
                        </Link>
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