import React, {Component, Fragment} from 'react';
import ButtonIcon from "./common/ButtonIcon";
import InputText from "./common/InputText";
import ButtonDropdown from "./common/ButtonDropdown";
import {withRouter} from 'react-router-dom';
import UserProfileEdit from "../screens/dashboard/UserProfileEdit";
import AuthService from "../services/AuthService";

class ActionBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: this.props.initialSearch || '',
            userProfileShow: false
        }

        this.userMenuItems = [
            {id: 1, text: 'Your Profile'},
            {id: 2, text: 'Your Simulations'},
            {id: 3, text: 'Your Environments'},
            {id: 4, text: 'Your Robots'},
            {id: 5, text: 'Sign Out'},
        ];
    }

    onSearchSubmit = (e) => {
        this.props.onSearchSubmit(this.state.searchValue);
    }

    updateSearchValue(e) {
        this.setState({searchValue: e.target.value});
    }

    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.onSearchSubmit(e);
        }
    };

    handleLogout() {
        AuthService.postLogout();
        this.props.history.push("/app");
            
    }

    handleMenuItemSelect = (item) => {
        const {history} = this.props;

        switch (item.id) {
            case 1:
                this.setState({userProfileShow: true});
                break;
            case 2:
                history.push('/app/simulations');
                break;
            case 3:
                history.push('/app/environments');
                break;
            case 4:
                history.push('/app/robots');
                break;
            case 5:
                this.handleLogout();
        }
    }

    showUserProfile = () => {
        return <UserProfileEdit onExited={() => this.setState({userProfileShow: false})}/>;
    }

    renderSearch() {
        return (
            <Fragment>
                <InputText type="basic" inputType="text" placeholder="Query" value={this.state.searchValue}
                           onChange={(e) => this.updateSearchValue(e)} onKeyUp={this.handleKeyUp}/>
                <ButtonIcon type="primary" size="lg" onClick={this.onSearchSubmit}>
                    <i className="fas fa-search"/>
                </ButtonIcon>
            </Fragment>
        );
    }

    render() {
        return (
            <Fragment>
                <div className='action-bar clearfix'>
                    <div className='items-left'>
                        {this.props.children}
                    </div>
                    <div className='items-right'>
                        <div className='search-holder'>
                            {this.renderSearch()}
                        </div>
                        <div className='user-holder'>
                            <ButtonDropdown iconButton plain type='primary' size='lg'
                                            leadText='Signed in as Username'
                                            items={this.userMenuItems}
                                            onItemSelect={this.handleMenuItemSelect}
                            >
                                <i className="fas fa-cog fa-2x"/>
                            </ButtonDropdown>
                        </div>
                    </div>
                </div>
                {(this.state.userProfileShow) ? this.showUserProfile() : null}
            </Fragment>
        );
    }
}

export default withRouter(ActionBar);