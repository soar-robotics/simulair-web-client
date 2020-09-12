import React, {Component, Fragment} from 'react';
import ModalDefault from "../../components/ModalDefault";
import imgPlaceholder from "../../assets/img/simulation_placeholder.png";
import Divider from "../../components/common/Divider";
import InputText from "../../components/common/InputText";
import Button from "../../components/common/Button";
import {Row, Col} from "react-bootstrap";

class UserProfileEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true
        }
    }

    onHide = () => {
        this.setState({show: false});
    }

    onExited = () => {
        this.props.onExited();
    }

    renderContent = () => {
        return (
            <Fragment>
                <div>
                    <Row>
                        <Col>
                            <InputText type="bordered" inputType="text" label="First Name" placeholder="First name"/>
                        </Col>
                        <Col>
                            <InputText type="bordered" inputType="text" label="Last Name" placeholder="Last name"/>
                        </Col>
                    </Row>
                </div>
                <Divider spacing={25}/>
                <InputText type="bordered" inputType="text" label="Username" placeholder="Username"/>
                <Divider spacing={25}/>
                <InputText type="bordered" inputType="text" label="Company" placeholder="Company"/>
                <Divider spacing={25}/>
                <InputText type="bordered" inputType="text" label="Email" placeholder="Email"/>
                <Divider spacing={60}/>
                <Button type="primary" size="lg" outline className={`_center-block`}>Submit Changes</Button>
            </Fragment>
        );
    }

    renderSide = () => {
        return (
            <Fragment>
                <div className='profile-image'>
                    <div className='image-holder'>
                        <div className='image-inner'>
                            <img src={imgPlaceholder} alt=''/>
                        </div>
                    </div>
                    <div className='form'>
                        <Button type="light" size="sm" icon className={`_center-block`}>Upload Photo</Button>
                    </div>
                </div>
            </Fragment>
        );
    }

    renderFooter() {
        return null;
    }

    render() {
        console.log('create');
        return (
            <ModalDefault
                show={this.state.show}
                onHide={this.onHide}
                onExited={this.onExited}
                modalClassName='modal-user-profile-edit'
                title='Your Profile'
                renderSide={this.renderSide}
                renderContent={this.renderContent}
                renderFooter={this.renderFooter}
            />
        );
    }
}

export default UserProfileEdit;