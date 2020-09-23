import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import Button, {buttonSizes, buttonTypes} from './Button';
import styles from './ButtonIcon.module.scss';
import {Button as VendorButton} from "react-bootstrap";

const ButtonIcon = (props) => {
    const {type, size, plain, className, children, ...rest} = props;
    // types: primary, secondary, tertiary
    // size: lg, md, sm
    // plain: true|false

    const btnTypes = buttonTypes();
    const btnSizes = buttonSizes();

    const btnClasses = classnames({
        [styles[`btn-${size}`]]: _.includes(btnSizes, size),
        [styles[`btn-${type}`]]: _.includes(btnTypes, type),
        [styles['btn-plain']]: plain,
    }, className, styles['btn-icon']);

    return (
        <Button
            type={type}
            className={btnClasses}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default ButtonIcon;

/*
Use examples:

<ButtonIcon type="secondary" size="lg" className={`_center-block`}><i className="fas fa-search"/></ButtonIcon>
<ButtonIcon type="tertiary" size="lg" className={`_center-block`}><i className="fas fa-search"/></ButtonIcon>
<ButtonIcon type="primary" size="sm" plain className={`_center-block text-color-primary`}><i className="fas fa-caret-down fa-2x"/></ButtonIcon>
 */