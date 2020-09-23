import React, {Component, Fragment} from 'react';
import ReactDOM from "react-dom";
import {Container, Modal} from "react-bootstrap";
import LoadingBox from "./common/LoadingBox";

class ModalDefault extends Component {
    constructor(props) {
        super(props);

        this.modalRoot = document.getElementById('modal-root');
        this.el = document.createElement('div');
    }

    componentDidMount() {
        this.modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
    }

    renderModalDefaultContent() {
        const {renderContent, title, renderFooter} = this.props;
        return (
            <Fragment>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-body-inner'>
                        {renderContent()}
                    </div>
                </Modal.Body>
                <Modal.Footer className={(!renderFooter()) ? 'no-footer' : ''}>
                    {renderFooter()}
                </Modal.Footer>
            </Fragment>
        )
    }

    renderModalContent() {
        const {renderSide, renderContent, title, renderFooter} = this.props;

        if (renderSide) {
            return (
                <Fragment>
                    <div className='with-side-container'>
                        <div className='side'>
                            {renderSide()}
                        </div>
                        <div className='main-content'>
                            {this.renderModalDefaultContent()}
                        </div>
                    </div>
                </Fragment>
            );
        }

        return (
            <Fragment>
                {this.renderModalDefaultContent()}
            </Fragment>
        );
    }

    render() {
        const {modalClassName, renderSide, renderContent, renderFooter, isLoading, ...restProps} = this.props;

        return ReactDOM.createPortal(
            <Modal
                {...restProps}
                centered
                className={`modal-dialog-default ${modalClassName} ${(renderSide) ? 'has-side' : ''}`}
                backdropClassName='modal-backdrop-default'
            >

                {(isLoading) &&
                <LoadingBox hasBackdrop/>
                }
                {this.renderModalContent()}
            </Modal>,
            this.el
        );
    }
}

export default ModalDefault;