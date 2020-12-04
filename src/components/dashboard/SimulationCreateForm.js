import React, {Fragment} from 'react';
import {Alert, Col, Form, Row} from "react-bootstrap";
import InputText from "../common/InputText";
import Divider from "../common/Divider";
import Button from "../common/Button";
import {useForm} from "react-hook-form";
import styles from "../../screens/auth/LoginRegister.module.scss";
import TextLoadingIcon from "../common/TextLoadingIcon";
import ButtonDropdown from "../../components/common/ButtonDropdown";

const SimulationCreateForm = (props) => {
    const {register, handleSubmit, errors, formState} = useForm();
    const {selectedEnvironment, selectedRobot} = props;

    const rules = {
        name: {
            required: 'Name is required.'
        },
        description: {
            required: 'Description is required.'
        },
        robotId: {
            required: 'Robot is required.'
        },
        environmentId: {
            required: 'Environment is required.'
        }
    };

    const onSubmit = data => {
        props.onFormSubmit(data);
    }

    const renderApiError = () => {
        const error = props.apiErrorResponse;
        if (error?.status === 404) {
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
        }
        return null;
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input hidden name='robot_id'
                       value={(selectedRobot) ? selectedRobot : ''}
                       ref={register(rules.robotId)}
                       readOnly
                />
                <input hidden name='environment_id'
                       value={(selectedEnvironment) ? selectedEnvironment.id : ''}
                       ref={register(rules.environmentId)}
                       readOnly
                />
                {((errors.robot_id && !selectedRobot) || (errors.environment_id && !selectedEnvironment)) &&
                <Fragment>
                    <Divider spacing={25}/>
                    <Alert variant='danger'>
                        <div>{errors.robot_id?.type === 'required' && rules.robotId.required}</div>
                        <div>{errors.environment_id?.type === 'required' && rules.environmentId.required}</div>
                    </Alert>
                </Fragment>
                }
                <Divider spacing={25}/>
                <Form.Group>
                    <InputText type="bordered" inputType="text" name='name' label="Name"
                               placeholder="Enter name"
                               ref={register(rules.name)}
                    />
                    {errors.name &&
                    <Alert variant='danger'>
                        {errors.name?.type === 'required' && rules.name.required}
                    </Alert>
                    }
                </Form.Group>
                <Form.Group>
                    <InputText type="bordered" inputType="text" name='description' label="Description"
                               placeholder="Enter description"
                               as="textarea"
                               rows={5}
                               ref={register(rules.description)}
                    />
                    {errors.description &&
                    <Alert variant='danger'>
                        {errors.description?.type === 'required' && rules.description.required}
                    </Alert>
                    }
                </Form.Group>
                {props.apiErrorResponse &&
                <Fragment>
                    {renderApiError()}
                </Fragment>
                }
                <Divider spacing={40}/>
                <Button inputType='submit' className={`_center-block`} type="primary" size="lg">
                    Create and Run
                </Button>
            </form>
        </Fragment>
    )
}

export default SimulationCreateForm;