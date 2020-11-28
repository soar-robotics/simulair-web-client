import React, {Component, Fragment} from 'react';
import {useForm} from "react-hook-form";
import {Container, Form, Alert, Row, Col} from "react-bootstrap";
import styles from "../../screens/auth/LoginRegister.module.scss";
import InputText from "../common/InputText";
import Divider from "../common/Divider";
import Button from "../common/Button";
import TextLoadingIcon from "../common/TextLoadingIcon";

const RegisterForm = (props) => {
    const {register, handleSubmit, watch, errors} = useForm();

    const rules = {
        firstName: {
            required: 'First name is required.'
        },
        lastName: {
            required: 'Last name is required.'
        },
        company: {
            required: 'Company is required.'
        },
        email: {
            required: 'Email is required.',
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
        },
        passwordConfirm: {
            required: 'Password is required.',
            minLength: {
                value: 8,
                message: 'Minimum password length is 8 characters.'
            }
        },
        terms: {
            required: 'Terms of Use and Privacy Policy must be accepted.'
        }
    };

    // TODO: extract to reusable component
    const onSubmit = data => {
        props.onFormSubmit(data);
    }

    // TODO: extract to reusable component that renders validation errors when rendered
    // TODO: extract client-side validation errors (inline) to reusable component
    const renderApiError = () => {
        const error = props.apiErrorResponse;
        if (error?.status === 400) {
            return (
                <Alert variant='danger'>
                    <ul>
                        {Object.entries(error.data.errors).map((error, index) => {
                            return (
                                <li key={index}>{error[1].message}</li>
                            )
                        })}
                    </ul>
                </Alert>
            );
        }else 
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
            <div>
                <Row>
                    <Col>
                        <Form.Group>
                            <InputText type="bordered" inputType="text" name="first_name" label="First Name"
                                       placeholder="First name"
                                       ref={register(rules.firstName)}
                            />
                            {errors.first_name &&
                            <Alert variant='danger'>
                                {errors.first_name?.type === 'required' && rules.firstName.required}
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <InputText type="bordered" inputType="text" name="last_name" label="Last Name"
                                       placeholder="Last name"
                                       ref={register(rules.lastName)}
                            />
                            {errors.last_name &&
                            <Alert variant='danger'>
                                {errors.last_name?.type === 'required' && rules.lastName.required}
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <Form.Group>
                <InputText type="bordered" inputType="text" name="company" label="Company"
                           placeholder="Company"
                           ref={register(rules.company)}
                />
                {errors.company &&
                <Alert variant='danger'>
                    {errors.company?.type === 'required' && rules.company.required}
                </Alert>
                }
            </Form.Group>
            <Form.Group>
                <InputText type="bordered" inputType="text" name="email" label="Email"
                           placeholder="Email"
                           ref={register(rules.email)}
                />
                {errors.email &&
                <Alert variant='danger'>
                    {errors.email?.type === 'required' && rules.email.required}
                    {errors.email?.type === 'pattern' && rules.email.pattern.message}
                </Alert>
                }
            </Form.Group>
            <div>
                <Row>
                    <Col>
                        <Form.Group>
                            <InputText type="bordered" inputType="password" name="password" label="Password"
                                       placeholder="Password"
                                       ref={register(rules.password)}
                            />
                            {errors.password &&
                            <Alert variant='danger'>
                                {errors.password?.type === 'required' && rules.password.required}
                                {errors.password?.type === 'minLength' && rules.password.minLength.message}
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <InputText type="bordered" inputType="password" name="confirm_password" label="Confirm Password"
                                       placeholder="Password"
                                       ref={register(rules.passwordConfirm)}
                            />
                            {errors.confirm_password &&
                            <Alert variant='danger'>
                                {errors.confirm_password?.type === 'required' && rules.passwordConfirm.required}
                                {errors.confirm_password?.type === 'minLength' && rules.passwordConfirm.minLength.message}
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <Form.Group className={`${styles.checkbox}`} controlId="terms">
                <Form.Check custom type="checkbox">
                    <Form.Check.Input type="checkbox" name="terms" ref={register(rules.terms)}/>
                    <Form.Check.Label>I accept the <a href='#'>Terms of Use</a> and <a href='#'>Privacy Policy</a></Form.Check.Label>
                </Form.Check>
                {errors.terms &&
                <Alert variant='danger'>
                    {errors.terms?.type === 'required' && rules.terms.required}
                </Alert>
                }
            </Form.Group>
            <Divider spacing={50}/>
            <Button inputType='submit' type="primary" size="lg" className={`_center-block`}
                    disabled={props.registerInProgress}
            >
                {props.registerInProgress && (
                    <TextLoadingIcon/>
                )}
                Sign Up
            </Button>
        </form>
    );
}

export default RegisterForm;