import React, {Component, Fragment} from 'react';
import ModalDefault from "../../components/ModalDefault";
import imgPlaceholder from "../../assets/img/simulation_placeholder.png";
import Divider from "../../components/common/Divider";
import InputText from "../../components/common/InputText";
import Button from "../../components/common/Button";
import ButtonDropdown from "../../components/common/ButtonDropdown";

class SimulationCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true
        }

        this.items = [
            {id: 1, text: 'Item 1'},
            {id: 2, text: 'Item 2'},
            {id: 3, text: 'Item 3'},
        ];

        console.log(this.props);
    }

    onHide = () => {
        this.setState({show: false});
    }

    onExited = () => {
        // pass path to navigate back through props!!
        this.props.history.goBack();
    }

    handleItemSelect = (item) => {
        console.log(item);
    }

    renderContent = () => {
        return (
            <Fragment>
                <div className='selection-grid'>
                    <div className='item'>
                        <div className='title'>
                            <span>Robot</span>
                        </div>
                        <div className='img-holder'>
                            <img src={imgPlaceholder} alt=''/>
                        </div>
                        <div className='dropdown-holder'>
                            <ButtonDropdown type='primary' size='sm' items={this.items} onItemSelect={this.handleItemSelect}>
                                Select
                            </ButtonDropdown>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='title'>
                            <span>Environment</span>
                        </div>
                        <div className='img-holder'>
                            <img src={imgPlaceholder} alt=''/>
                        </div>
                        <div className='dropdown-holder'>
                            <ButtonDropdown type='primary' size='sm' items={this.items} onItemSelect={this.handleItemSelect}>
                                Select
                            </ButtonDropdown>
                        </div>
                    </div>
                </div>
                <Divider spacing={25}/>
                <InputText type="bordered" inputType="text" label="Name" placeholder="Enter name"/>
                <Divider spacing={25}/>
                <InputText type="bordered" inputType="text" label="Description" placeholder="Enter description"
                           as="textarea" rows={5}/>
            </Fragment>
        );
    }

    renderFooter() {
        return (
            <Button type="primary" size="lg">Create and Run</Button>
        );
    }

    render() {
        console.log('create');
        return (
            <ModalDefault
                show={this.state.show}
                onHide={this.onHide}
                onExited={this.onExited}
                modalClassName='modal-new-simulation'
                title='Create New Simulation'
                renderContent={this.renderContent}
                renderFooter={this.renderFooter}
            />
        );
    }
}

export default SimulationCreate;