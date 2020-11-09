import React, {Component, Fragment} from 'react';
import ModalDefault from "../../components/ModalDefault";
import imgPlaceholder from "../../assets/img/simulation_placeholder.png";
import Divider from "../../components/common/Divider";
import InputText from "../../components/common/InputText";
import Button from "../../components/common/Button";
import ButtonDropdown from "../../components/common/ButtonDropdown";
import SimulationService from "../../services/SimulationService";
import _ from "lodash";
import RobotService from "../../services/RobotService";
import EnvironmentService from "../../services/EnvironmentService";
import SimulationCreateForm from "../../components/dashboard/SimulationCreateForm";
import UserProfileEditForm from "../../components/dashboard/UserProfileEditForm";
import AuthService from "../../services/AuthService";
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";

class SimulationCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true,
            robots: [],
            environments: [],
            selectedRobot: "5fa3e4ec232d690ec040c5d5",
            selectedEnvironment: null,
            createInProgress: false,
            apiErrorResponse: null
        }

        this.temporaryThumbnailUrls = [
            'https://i.imgur.com/q4mv4QN.png',
            'https://i.imgur.com/cUNy0pr.png',
            'https://i.imgur.com/EJth8eS.png',
            'https://i.imgur.com/52gDaGU.png'
        ];
    }

    componentDidMount() {
        this.prepareData();
    }

    prepareData = () => {
        RobotService.getRobots()
            .then((response) => {
                this.setState({robots: response.data});
            })
            .finally(() => {

            });

        EnvironmentService.getEnvironments()
            .then((response) => {
                this.setState({environments: response.data});
            })
            .finally(() => {

            });
    }

    onHide = () => {
        this.setState({show: false});
    }

    onExited = () => {
        this.props.onExited();
    }

    handleFormSubmit = (values) => {
        this.setState({
            createInProgress: true,
            apiErrorResponse: null
        });

        const data = {...values, status: 'running', thumbnail: _.sample(this.temporaryThumbnailUrls)};

        SimulationService.postCreate(data).then((response) => {
            this.props.onCreated(response.data);
            toast.success(`Simulation created.`);
            this.setState({show: false});
        }).catch(error => {
            if (error.response) {
                console.log(error.response);
                this.setState({apiErrorResponse: error.response});
            }
        }).finally(() => {
            this.setState({createInProgress: false});
        });
    }

    handleEnvironmentSelect = (item) => {
        this.setState({selectedEnvironment: item});
    }

    // handleRobotSelect = (item) => {
    //     this.setState({selectedRobot: item});
        
    // }

    renderContent = () => {
        const {selectedEnvironment, selectedRobot} = this.state;

        return (
            <Fragment>
                <div style={{justifyContent:"center"}} className='selection-grid'>
                    
                    <div className='item'>
                        <div className='title'>
                            <span style={{paddingLeft:"45px"}}>Environment</span>
                        </div>
                        <div className='img-holder'>
                            <img src={(selectedEnvironment) ? selectedEnvironment.thumbnail : imgPlaceholder} alt=''/>
                        </div>
                        <div className='dropdown-holder'>
                            <ButtonDropdown type='primary' size='sm' items={this.state.environments} textKey='name'
                                            onItemSelect={this.handleEnvironmentSelect}
                            >
                                Select
                            </ButtonDropdown>
                        </div>
                    </div>
                </div>

                <SimulationCreateForm
                    selectedRobot={selectedRobot}
                    selectedEnvironment={selectedEnvironment}
                    apiErrorResponse={this.state.apiErrorResponse}
                    onFormSubmit={this.handleFormSubmit}
                />
                
            </Fragment>

        );
    }

    renderFooter() {
        return null;
    }

    render() {
        return (
            <ModalDefault
                show={this.state.show}
                onHide={this.onHide}
                onExited={this.onExited}
                modalClassName='modal-new-simulation'
                title='Create New Simulation'
                isLoading={this.state.createInProgress}
                renderContent={this.renderContent}
                renderFooter={this.renderFooter}
            />
        );
    }
}

export default SimulationCreate;