import React, {Fragment} from 'react';
import classnames from 'classnames';
import styles from './InputText.module.scss';
import {Form} from "react-bootstrap";

const InputText = (props) => {
    const {type, inputType, size, placeholder, label, children, ...rest} = props;
    // type: basic, bordered
    // inputType: password, email, text,...
    // size: ?

    const inputClasses = classnames({
        [styles.bordered]: type === 'bordered',
        [styles.basic]: type === 'basic',
    }, styles.input);

    return (
        <Fragment>
            {(label) &&
            <Form.Label>{label}</Form.Label>
            }
            <Form.Control className={inputClasses} type={inputType} placeholder={placeholder} {...rest}/>
        </Fragment>
    );
};

export default InputText;

/*
Use examples:

<ButtonIcon type="secondary" size="lg" className={`_center-block`}><i className="fas fa-search"/></ButtonIcon>
<ButtonIcon type="tertiary" size="lg" className={`_center-block`}><i className="fas fa-search"/></ButtonIcon>
<ButtonIcon type="primary" size="sm" plain className={`_center-block text-color-primary`}><i className="fas fa-caret-down fa-2x"/></ButtonIcon>
 */