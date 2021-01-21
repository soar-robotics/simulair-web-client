import React, {Component, Fragment} from 'react';
import {updateUser, updateUserImage} from "../../store/actions";
import ModalDefault from "../../components/ModalDefault";
import profileImgPlaceholder from 'assets/img/profile.png';
import Divider from "../../components/common/Divider";
import InputText from "../../components/common/InputText";
import Button from "../../components/common/Button";
import {Row, Col} from "react-bootstrap";
import UserProfileEditForm from "../../components/dashboard/UserProfileEditForm";
import {connect} from "react-redux";
import {fetchAuthUser} from "../../store/actions";
import LoginForm from "../../components/auth/LoginForm";
import AuthService from "../../services/AuthService";
import {toast} from "react-toastify";
import { GenericForm } from 'redux-form';

class UserProfileEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updateInProgress: false,
            apiErrorResponse: null,
            show: true
        }

        this.imageInputRef = React.createRef();
        this.uploadedImageBase64 = null;
    }

    closeModal = () => {
        this.setState({show: false});
    }

    onHide = () => {
        this.closeModal();
    }

    onExited = () => {
        this.props.onExited();
    }

    handleFormSubmit = (values) => {
        this.setState({
            updateInProgress: true,
            apiErrorResponse: null
        });

        AuthService.patchUpdateMe(values).then((response) => {
            this.props.updateUser(response.data);
            toast.success(`Profile info updated.`);
            this.closeModal();
        }).catch(error => {
            if (error.response) {
                this.setState({apiErrorResponse: error.response});
            }
        }).finally(() => {
            this.setState({updateInProgress: false});
        });
    }

    handleReaderLoaded = (e) => {
        let binaryString = e.target.result;
        this.uploadedImageBase64 = btoa(binaryString);
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
            if ((encoded.length % 4) > 0) {
              encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
          };
          reader.onerror = error => reject(error);
        });
      }

    showFilePicker = () => {
        this.imageInputRef.current.click();
    }

    handleFileSelect = (e) => {
        const file = e.target.files[0];
        this.setState({updateInProgress : true});
        return AuthService.uploadImage(file)
                          .then((response) => {
                              console.log(response);
                              this.props.updateUserImage(response);
                              toast.success(`Profile image updated.`);
                          }).catch(error => {
                                    console.log(error);
                                  })
                            .finally(() => {
                                      this.setState({updateInProgress: false});
                                     
                                  });
        // if(file){
        //     this.getBase64(file)
        //     .then(encoded => {
        //         this.setState({updateInProgress: true});
        //         return AuthService.postUpdateImage(encoded).then(response => {
        //             console.log(response);
        //             this.props.updateUserImage(response.data.profile_image);
        //             toast.success(`Profile image updated.`);
        //         });
        //     }).catch(error => {
        //         console.log(error);
        //      }).finally(() => {
        //          this.setState({updateInProgress: false});
        //      });
        // }
    }

    renderContent = () => {
        return (
            <UserProfileEditForm
                updateInProgress={this.state.updateInProgress}
                authUser={this.props.authUser}
                apiErrorResponse={this.state.apiErrorResponse}
                onFormSubmit={this.handleFormSubmit}
            />
        );
    }

    renderSide = () => {
        const {profileImage} = this.props.authUser;
        return (
            <Fragment>
                <div className='profile-image'>
                    <div className='image-holder'>
                        <div className='image-inner'>
                            <img src={(profileImage) ? profileImage : profileImgPlaceholder} alt='Profile image'/>
                        </div>
                    </div>
                    <div className='form'>
                        <input hidden type="file" accept="image/*"
                               onChange={this.handleFileSelect}
                               ref={this.imageInputRef}/>
                        <Button type="light" size="sm" icon='fas fa-upload' className={`_center-block`}
                                onClick={this.showFilePicker}
                        >
                            Upload Photo
                        </Button>
                    </div>
                </div>
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
                modalClassName='modal-user-profile-edit'
                title='Your Profile'
                renderSide={this.renderSide}
                renderContent={this.renderContent}
                renderFooter={this.renderFooter}
                isLoading={this.state.updateInProgress}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {authUser: state.auth.user};
};

export default connect(mapStateToProps, {updateUser, updateUserImage})(UserProfileEdit);
