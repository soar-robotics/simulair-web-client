import React, {Fragment, useState, useEffect, useRef} from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import Button, {buttonSizes, buttonTypes} from './Button';
import styles from './ButtonDropdown.module.scss';
import ButtonIcon from "./ButtonIcon";

const ButtonDropdown = (props) => {
    const {type, size, className, items, leadText, iconButton, onItemSelect, children, textKey, ...rest} = props;
    // types: primary, secondary, tertiary
    // size: lg, md, sm
    // plain: true|false

    const wrapperRef = useRef(null);
    const [activeItem, setActiveItem] = useState(null);
    const [dropdownOpened, setDropdownOpened] = useState(false);

    /*const dropdownItems = [
        {id: 1, text: 'Item 1'},
        {id: 2, text: 'Item 2'},
        {id: 3, text: 'Item 3'},
    ];*/

    const dropdownItems = (items) ? items : [];

    const textKeyProp = props.textKey || "text";

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setDropdownOpened(false);
        }
    };

    const handleButtonClick = () => {
        setDropdownOpened(!dropdownOpened);
    }

    const selectItem = (item) => {
        setActiveItem(item);
        setDropdownOpened(false);
        onItemSelect(item);
    }

    const renderButtonText = () => {
        return (activeItem === null) ? children : activeItem[textKeyProp];
    }

    const btnTypes = buttonTypes();
    const btnSizes = buttonSizes();

    const btnClasses = classnames({
        [styles[`btn-${size}`]]: _.includes(btnSizes, size),
        [styles['btn-dropdown']]: !iconButton
    }, className);

    const dropdownClasses = classnames({
        [styles[`btn-${type}`]]: _.includes(btnTypes, type),
        [styles['btn-dropdown-icon']]: iconButton,
        [styles['btn-dropdown-opened']]: dropdownOpened
    }, styles['dropdown']);

    return (
        <Fragment>
            <div className={dropdownClasses} ref={wrapperRef}>
                {(iconButton) &&
                <ButtonIcon
                    type={type}
                    size={size}
                    className={btnClasses}
                    onClick={handleButtonClick}
                    {...rest}
                >
                    {children}
                </ButtonIcon>
                }

                {(!iconButton) &&
                <Button
                    type={type}
                    size={size}
                    className={btnClasses}
                    onClick={handleButtonClick}
                    {...rest}
                >
                    <span className={styles['button-text']}>{renderButtonText()}</span>
                    <div className={styles['dropdown-icon']}>
                        <i className='fas fa-caret-down'/>
                    </div>
                </Button>
                }

                <div
                    className={`${styles['dropdown-menu']} ${(dropdownOpened) ? styles['dropdown-open'] : ''} btn-dropdown-menu`}
                >
                    {(leadText) &&
                        <p>{leadText}</p>
                    }
                    {
                        dropdownItems.map((dropdownItem) => {
                            return (
                                <div
                                    className={`${styles['dropdown-item']} ${(activeItem && activeItem.id === dropdownItem.id) ? styles['active'] : ''}`}
                                    key={dropdownItem.id}
                                    onClick={() => selectItem(dropdownItem)}
                                >
                                    <div className={styles['dropdown-item-inner']}>
                                        {dropdownItem[textKeyProp]}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default ButtonDropdown;

/*
Use examples:

<ButtonIcon type="secondary" size="lg" className={`_center-block`}><i className="fas fa-search"/></ButtonIcon>
<ButtonIcon type="tertiary" size="lg" className={`_center-block`}><i className="fas fa-search"/></ButtonIcon>
<ButtonIcon type="primary" size="sm" plain className={`_center-block text-color-primary`}><i className="fas fa-caret-down fa-2x"/></ButtonIcon>
 */