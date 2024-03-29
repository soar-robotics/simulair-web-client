import React, {Component} from 'react';
import {Container, Form} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import Divider from 'components/common/Divider';
import styles from './LoginRegister.module.scss';
import logoImg from 'assets/img/logo.png';
import googleImg from 'assets/img/google.png';
import AuthService from 'services/AuthService';
import LoginForm from "../../components/auth/LoginForm";
import LoadingBox from "../../components/common/LoadingBox";
import {SIMULAIR_API} from "../../config/app";
import queryString from "query-string";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginInProgress: false,
            apiErrorResponse: null,
            email: ''
        };
    }

    componentDidMount() {
        
        const params = queryString.parse(this.props.location.search);
        if (params.verify) {
            toast.info(`Email verified successfully, you may now login.`);
        }
        if (params.email) {
            this.setState({email: params.email});
        }
    }

    handleGoogleSignIn = () => {
         AuthService.onGoogleSignup()
                     .catch(err => {alert(err)});

    }

    handleFormSubmit = (values) => {
        this.setState({loginInProgress: true});

        const {email, password} = values;

        AuthService.postLogin(email, password, (err, result) => {
            if(err){
                this.setState({apiErrorResponse: err});
                console.log(err);
                this.setState({loginInProgress: false});
            }else{
                this.props.history.push("/app");
                toast.success(`Logged in successfully!`);
            }
        });
    }

    render() {

       
        return (
            <div className={styles.vCenter}>
                <Container className={styles.wrapper}>
                    {(this.state.loginInProgress) &&
                    <LoadingBox hasBackdrop/>
                    }
                    <Container className={styles.content}>
                        <div className={styles.logo}>
                            <img src={logoImg} alt=''/>
                        </div>
                        <Divider spacing={45}/>
                        <LoginForm
                            email={this.state.email}
                            loginInProgress={this.state.loginInProgress}
                            onFormSubmit={this.handleFormSubmit}
                            apiErrorResponse={this.state.apiErrorResponse}
                        />
                        <Divider spacing={45}/>
                        <div className={styles.providersHolder}>
                            <p>or login with</p>
                            <div className={styles.list}>
                                <div className={styles.item}>
                                    <img onClick={this.handleGoogleSignIn} src={googleImg}/>
                                </div>
                            </div>
                        </div>
                        <Divider spacing={50}/>
                        <p className={styles.register}>Not a member? <Link to='/register'>Sign up now!</Link></p>
                    </Container>
                </Container>
            </div>
        );
    }
}

export default Login;