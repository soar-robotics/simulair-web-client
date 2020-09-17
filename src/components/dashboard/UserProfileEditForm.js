import React, {Fragment} from 'react';
import {Alert, Col, Form, Row} from "react-bootstrap";
import InputText from "../common/InputText";
import Divider from "../common/Divider";
import Button from "../common/Button";
import {useForm} from "react-hook-form";
import styles from "../../screens/auth/LoginRegister.module.scss";
import TextLoadingIcon from "../common/TextLoadingIcon";

const UserProfileEditForm = (props) => {
    const {authUser} = props;
    const {register, handleSubmit, errors, formState} = useForm();

    const rules = {
        firstName: {
            required: 'First name is required.'
        },
        lastName: {
            required: 'Last name is required.'
        },
        username: {
            required: 'Username is required.'
        },
        company: {
            required: 'Company is required.'
        }
    };

    const onSubmit = data => {
        console.log(data);
        props.onFormSubmit(data);
    }

    const renderApiError = () => {
        const error = props.apiErrorResponse;
        console.log(error);
        if (error?.status === 422) {
            return (
                <Alert variant='danger'>
                    <ul>
                        {Object.entries(error.data.errors).map((error, index) => {
                            return (
                                <li key={index}>{error[1]}</li>
                            )
                        })}
                    </ul>
                </Alert>
            );
        }
        return null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Row>
                    <Col>
                        <Form.Group>
                            <InputText type="bordered" inputType="text" name="first_name" label="First Name"
                                       defaultValue={authUser.firstName} placeholder="First name"
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
                                       defaultValue={authUser.lastName} placeholder="Last name"
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
                <InputText type="bordered" inputType="text" name="username" label="Username"
                           defaultValue={authUser.username} placeholder="Username"
                           ref={register(rules.username)}
                />
                {errors.username &&
                <Alert variant='danger'>
                    {errors.username?.type === 'required' && rules.username.required}
                </Alert>
                }
            </Form.Group>
            <Form.Group>
                <InputText type="bordered" inputType="text" name="company" label="Company"
                           defaultValue={authUser.company} placeholder="Company"
                           ref={register(rules.company)}
                />
                {errors.company &&
                <Alert variant='danger'>
                    {errors.company?.type === 'required' && rules.company.required}
                </Alert>
                }
            </Form.Group>
            {props.apiErrorResponse &&
            <Fragment>
                {renderApiError()}
            </Fragment>
            }
            {formState.isDirty && (
                <Fragment>
                    <Divider spacing={60}/>
                    <Button inputType='submit' type="primary" size="lg" outline className={`_center-block`}
                            disabled={props.updateInProgress}>
                        {props.updateInProgress && (
                            <TextLoadingIcon/>
                        )}
                        Submit Changes
                    </Button>
                </Fragment>
            )
            }
        </form>
    );
}

export default UserProfileEditForm;