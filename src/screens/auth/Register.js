import React, {Component} from 'react';
import {Container, Form} from 'react-bootstrap';
import {toast} from "react-toastify";
import Divider from 'components/common/Divider';
import styles from './LoginRegister.module.scss';
import logoImg from 'assets/img/logo.png';
import googleImg from 'assets/img/google.png';
import AuthService from 'services/AuthService';
import LoadingBox from "../../components/common/LoadingBox";
import RegisterForm from "../../components/auth/RegisterForm";
import {SIMULAIR_API} from "../../config/app";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registerInProgress: false,
            apiErrorResponse: null
        };
    }

    handleFormSubmit = (values) => {
        this.setState({registerInProgress: true});

        AuthService.postRegister(values).then((response) => {
            this.props.history.push("/login");
            toast.info(`Verification email has been sent. Please verify your email address.`);
            
        }).catch(error => {
            console.log(error.response);
            if (error.response) {
                this.setState({apiErrorResponse: error.response});
            }
            this.setState({registerInProgress: false});
        });
    }

    render() {
        return (
            <div className={styles.vCenter}>
                <Container className={`${styles.wrapper} ${styles.register}`}>
                    {(this.state.registerInProgress) &&
                    <LoadingBox hasBackdrop/>
                    }
                    <Container className={styles.content}>
                        <div className={styles.logo}>
                            <img src={logoImg} alt=''/>
                        </div>
                        <Divider spacing={45}/>
                        <div className={styles['content-grid']}>
                            <div className={styles.left}>
                                <div className={styles.providersHolder}>
                                    <p>Sign Up using</p>
                                    <div className={styles.list}>
                                        <div className={styles.item}>
                                            <a href={`${SIMULAIR_API.BASE_URL}/${SIMULAIR_API.GOOGLE_AUTH_PATH}`}>
                                                <img src={googleImg}/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.main}>
                                <RegisterForm
                                    registerInProgress={this.state.registerInProgress}
                                    onFormSubmit={this.handleFormSubmit}
                                    apiErrorResponse={this.state.apiErrorResponse}
                                />
                            </div>
                        </div>
                    </Container>
                </Container>
            </div>
        );
    }
}

export default Register;