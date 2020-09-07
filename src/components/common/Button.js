import React from 'react';
import {Button as VendorButton} from "react-bootstrap";
import classnames from 'classnames';
import _ from 'lodash';
import styles from './Button.module.scss';

const buttonTypes = () => {
    return ['primary', 'secondary', 'tertiary', 'light'];
};
const buttonSizes = () => {
    return ['sm', 'md', 'lg'];
};

const Button = (props) => {
    const {type, size, outline, className, icon, children, ...rest} = props;
    // types: primary, secondary, tertiary, light
    // size: lg, md, sm
    // outline: true|false

    const btnTypes = buttonTypes();
    const btnSizes = buttonSizes();

    const btnClasses = classnames({
        'outline-primary': (outline === true),
        [styles[`btn-${type}`]]: _.includes(btnTypes, type) && !outline,
        [styles[`btn-outline-${type}`]]: _.includes(btnTypes, type) && outline,
        [styles[`btn-${size}`]]: _.includes(btnSizes, size),
        [styles['has-icon']]: icon
    }, 'app-btn', className);

    return (
        <VendorButton
            variant={(outline) ? 'outline-primary' : 'primary'}
            className={btnClasses}
            {...rest}
        >
            {icon &&
                <div className={styles.icon}>
                    <i className="fas fa-camera" />
                </div>
            }
            {children}
        </VendorButton>
    );
};

export {
  buttonTypes, buttonSizes
};
export default Button;

/*
Use examples:

<Button1 type="primary" size="lg" icon className={`_center-block`}>Login</Button1>
<Button1 type="primary" size="lg" outline icon className={`_center-block`}>Login</Button1>
<Button1 type="secondary" size="lg" outline icon className={`_center-block`}>Login</Button1>
<Button1 type="tertiary" size="lg" outline icon className={`_center-block`}>Login</Button1>
<Button1 type="secondary" size="lg" icon className={`_center-block`}>Login</Button1>
<Button1 type="tertiary" size="lg" icon className={`_center-block`}>Login</Button1>
<Button1 type="primary" outline size="sm" icon className={`_center-block`}>Login</Button1>
<Button1 type="secondary" outline size="sm" className={`_center-block`}>Login</Button1>
<Button1 type="tertiary" outline size="sm" className={`_center-block`}>Login</Button1>
<Button1 type="primary" outline size="md" className={`_center-block`}>Login</Button1>
<Button1 type="secondary" outline size="md" className={`_center-block`}>Login</Button1>
<Button1 type="tertiary" outline size="md" className={`_center-block`}>Login</Button1>
<Button1 type="primary" size="sm" icon className={`_center-block`}>Login</Button1>
<Button1 type="secondary" size="lg" className={`_center-block`}>Login</Button1>
<Button1 type="tertiary" size="md" className={`_center-block`}>Login</Button1>
 */