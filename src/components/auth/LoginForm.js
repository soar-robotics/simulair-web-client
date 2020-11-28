import React, {Component, Fragment} from 'react';
import {useForm} from "react-hook-form";
import {Container, Form, Alert} from "react-bootstrap";
import styles from "../../screens/auth/LoginRegister.module.scss";
import InputText from "../common/InputText";
import Divider from "../common/Divider";
import Button from "../common/Button";
import TextLoadingIcon from "../common/TextLoadingIcon";

const LoginForm = (props) => {
    const {register, handleSubmit, watch, errors} = useForm();

    const rules = {
        email: {
            required: 'Email address is required.',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address."
            }
        },
        password: {
            required: 'Password is required.',
            minLength: {
                value: 8,
                message: 'Minimum password length is 8 characters.'
            }
        }
    };

    const onSubmit = data => {
        props.onFormSubmit(data);
    }

    const renderApiError = () => {
        const error = props.apiErrorResponse;
        if (error?.code === "NotAuthorizedException") {
            return (
                <Alert variant='danger'>
                    {error?.message}
                </Alert>
            );
        }
        return null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {props.apiErrorResponse &&
            <Fragment>
                {renderApiError()}
                <Divider spacing={25}/>
            </Fragment>
            }
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <InputText type="bordered" inputType="text" name="email" placeholder="Enter email"
                           defaultValue={props.email}
                           ref={register(rules.email)}/>
                {errors.email &&
                <Alert variant='danger'>
                    {errors.email?.type === 'required' && rules.email.required}
                    {errors.email?.type === 'pattern' && rules.email.pattern.message}
                </Alert>
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <InputText type="bordered" inputType="password" name="password" placeholder="Enter password"
                           ref={register(rules.password)}/>
                {errors.password &&
                <Alert variant='danger'>
                    {errors.password?.type === 'required' && rules.password.required}
                    {errors.password?.type === 'minLength' && rules.password.minLength.message}
                </Alert>
                }
            </Form.Group>
            <Form.Group className={`${styles.checkbox}`} controlId="rememberMe">
                <Form.Check custom type="checkbox" name="remember" label="Remember me"/>
            </Form.Group>
            <Divider spacing={50}/>
            <Button inputType='submit' type="primary" size="lg" outline className={`_center-block`}
                    disabled={props.loginInProgress}
            >
                {props.loginInProgress && (
                    <TextLoadingIcon/>
                )}
                Login
            </Button>
        </form>
    );
}

export default LoginForm;