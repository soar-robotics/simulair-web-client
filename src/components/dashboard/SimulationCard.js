import React, {Component, Fragment} from 'react';
import {Collapse} from "react-bootstrap";
import simulationImg from 'assets/img/simulation_placeholder.png';
import Button from "../common/Button";
import LoadingBox from "../common/LoadingBox";
import SimulationService from "../../services/SimulationService";
import ButtonIcon from "../common/ButtonIcon";
import OpeningTabService  from "../../services/OpeningTabService";
import { zipObject } from 'lodash';
//import SimulationWorkshop from '../../screens/dashboard/SimulationWorkshop';

class SimulationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdating: false,
            html: ""
        }

    }


    sendCommand(id, command) {
        this.setState({
            isUpdating: true
        });
        SimulationService.patchManagerCommand(id, command)
            .then((response) => {
                console.log(response);
                this.props.onStatusUpdate(id, response.data.status); //retrieve the new status from the response object 
            })
            .finally(() => {
                this.setState({
                    isUpdating: false 
                });
            });
    }

    //     renderHtmlPage = () => {
    //         var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=");

    //         OpeningTabService.getHtmlPage(this.props.id)
    //                          .then((response) => {
    //                              console.log(response.htmlPage);
    //                              this.setState({
    //                                  html:response.htmlPage
    //                              })
    //                          })
    //                           .finally(() => win.document.body.innerHTML = '<p>'+this.state.html+'</p>');
                
    // }



    //  deleteSimulation(id){
    //     this.setState({
    //         isUpdating: true
    //     });
    //     SimulationService.deleteSimulation(id)
    //         .then(response => {
    //         console.log(response);
    //         })
    //         .finally(() => {
    //             this.setState({
    //                 isUpdating: false
    //             });
    //         });
    // }

    toggleOpen = () => {
        this.props.onToggleOpen(this.props.id);
    }
 
    render() {
        const {id, name, status, thumbnail, description, opened} = this.props;
        //const {path} = this.props.match;
        const path = window.location.origin;
        
        const renderButton = () => {
            if(this.props.currentstatus == 'stopped'){
            return <Button type="primary" size="sm" outline icon='fas fa-minus-circle'
                          onClick={() => this.sendCommand(id, 'terminate')}>
                         Delete
                    </Button>
            }
            else {
                return <Button type="primary" size="sm" outline icon='fas fa-stop'
                onClick={() => this.sendCommand(id, 'stop')}>
            Stop
        </Button>
            }
        }
        return (
            
            <div className='simulation-card-holder'>
                <div className='simulation-card'>
            
                    {
                    (this.state.isUpdating || (status === 'pending1' || status === 'pending2' || status === 'pending3' || status === 'pending4') ) &&
                    <LoadingBox hasBackdrop/>
                    }
                    <div className='top' onClick={this.toggleOpen}>
                        <div className='heading'>
                            <span>{name}, {status}</span>
                        </div>
                        <div className='btn-holder'>
                            <ButtonIcon type="tertiary" size="sm">
                                <i className={`fas fa-caret-${(opened) ? 'down' : 'right'} fa-2x`}/>
                            </ButtonIcon>
                        </div>
                    </div>

                    
                    <Collapse in={opened}>
                        <div>
                            <div className={`main`}>
                                <div className='left'>
                                    <div className='img-holder'>
                                        <img src={thumbnail} alt=''/>
                                    </div>
                                </div>
                                <div className='middle'>
                                    <div className='heading'>
                                        <span>{name}</span>
                                    </div>
                                    <p>
                                        {description}
                                    </p>
                                </div>
                                <div className='right'>
                                    <Button type="primary" size="sm" icon='fas fa-play'
                                            onClick={() => this.sendCommand(id, 'run')}>
                                        Run
                                    </Button>
                                    {renderButton()}
                                    <Button type="primary" size="sm" outline icon='fas fa-eye' onClick= {() => window.open(`${path}/simulationrender?sim=${id}`, "_blank")}>
                                        
                                        View</Button>
                                </div>
                            </div>
                        </div>
                    </Collapse>
                </div>
                
            </div>
        );
    }
}

//TODO new view tab is directed to localhost all the time, it should be directed to
export default SimulationCard;