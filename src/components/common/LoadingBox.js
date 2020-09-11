import React, {Component} from 'react';
import {BeatLoader} from "react-spinners";
import classnames from "classnames";
import styles from "./Button.module.scss";
import _ from "lodash";

const LoadingBox = (props) => {
    const {hasBackdrop, text} = props;

    const containerClasses = classnames({
        'loadingBackdrop': hasBackdrop
    }, 'loading-block-indicator');

    const indicatorClasses = classnames({

    }, 'loading-inner');

    return (
        <div className={`${containerClasses}`}>
            <div className={`${indicatorClasses}`}>
                <BeatLoader
                    size={15}
                    margin={3}
                    color={"#7a40f2"}
                    loading={true}
                />
                {(text) &&
                    <span>{text}</span>
                }
            </div>
        </div>
    );
}

export default LoadingBox;