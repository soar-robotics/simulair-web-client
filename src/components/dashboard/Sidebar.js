import React, {Component} from 'react';

import logoImg from 'assets/img/logo.png';
import profileImgPlaceholder from 'assets/img/profile.png';
import Divider from "../common/Divider";
import {Link, matchPath} from "react-router-dom";
import {connect} from "react-redux";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.navItems = [
            {
                key: 1,
                path: '/simulations',
                name: 'Simulations'
            },
            {
                key: 2,
                path: '/environments',
                name: 'Environments'
            },
            {
                key: 3,
                path: '/robots',
                name: 'Robots'
            }
        ];
    }

    onNavItemClick(itemId) {

    }

    renderNavItems() {
        const {path} = this.props.match;

        return this.navItems.map((item) => {
            const isActive = matchPath(this.props.location.pathname, {path: `${path}${item.path}`});

            return (
                <Link to={`${path}${item.path}`} className={`nav-item ${isActive ? 'active' : ''}`}
                      key={item.key}
                      onClick={(e) => this.onNavItemClick(item.key, e)}>
                    <span>{item.name}</span>
                    <div className='end-top'/>
                    <div className='end-bottom'/>
                </Link>
            );
        });
    }

    render() {
        const authUser = this.props.authUser;
        console.log(logoImg);

        return (
            <div className='sidebar'>
                <div className='sidebar-inner sticky-top'>
                    <div className='logo'>
                        <div className='logo-holder'>
                            <Link to={`${this.props.match.path}`}>
                                <img src={logoImg} alt=''/>
                            </Link>
                        </div>
                    </div>
                    <div className='profile'>
                        <div className='image-holder'>
                            <div className='image-inner'>
                                <img src={(authUser.profileImage) ? authUser.profileImage : profileImgPlaceholder}
                                     alt='Profile image'
                                />
                            </div>
                        </div>
                        <span>{authUser.fullName}</span>
                    </div>
                    <Divider spacing={75}/>
                    <div className='sidebar-nav'>
                        {this.renderNavItems()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {authUser: state.auth.user};
};

export default connect(mapStateToProps)(Sidebar);