import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { html } from "./app-header.html";
// import { withSnackbar } from "notistack";
import { enqueueSnackbar, closeSnackbar } from 'notistack'
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import { StorageService, TempStorage, StorageKeys } from "../../../service/core/storage.service";
import AuthService from "../../../service/core/auth.service";
import Action from "../../../redux/action";
import { DashboardService } from "../../../service/api/dashboard.service";
import { fetchAuthSession ,signOut } from '@aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';



class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            beneficiaryName: '',
            drawerOpen: false,
            logoUrl: '',
            merchantName: '',
            activeMenu: 'transaction',
            anchorElUser: false,
            anchorElNav: false,
            anchorElViewDetails: '',
            email:'',


        }
    }

    toggleDrawer = () => {
        this.setState((state) => {
            return {
                drawerOpen: !state.drawerOpen
            }
        })
    }

    getMerchantName = (merchantName) => {

    }

    handleLogout = () => {
        StorageService.clearAll();
        TempStorage.loggedInUser = {};
        TempStorage.authToken = '';
        this.props.history.push('/guest-login')
    };

    getUserInfo = async () => {
        const response = await DashboardService.getUserInfo()
        if (!response) {
            return
        }
        this.setState({ logoUrl: response?.logo, merchantName: response?.merchantName ,email:response?.email });
    }

    onExit = () => {
        if (this.props.location.pathname === '/guest/beneficiary-details' || this.props.location.pathname === '/guest/claim-summary') {
            new Action(this).emitCommonEvent();
        } else {
            this.handleLogout();
        }
    };

    onSignOut = () => {
        // console.log('...signing out ....');
        signOut();
    }

    signOut = async () => {
        try {
            StorageService.clearAll();
            StorageService.clearAllLocalStorage();
            StorageService.clearAllTempStorage();
            await signOut();
        } catch (error) {  
            toast("Something went wrong, please try again later", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: "toast-message toast-error",
            });
            // console.log('error signing out: ', error);
        }
    }

    handleNavigateToNewPayment = (route) => {
        this.setState({activeMenu: 'Create Payment'});    
        this.props.history.push('/new-payment');
        this.setState((state) => {
            return {
                drawerOpen: !state.drawerOpen
            }
        });
    }
    handleNavigate = () => {
        this.setState({activeMenu: 'transaction'})    
        this.props.history.push('/home');
        this.setState((state) => {
            return {
                drawerOpen: !state.drawerOpen
            }
        });
    };

    handleDashboardNavigate = () => {
        this.setState({activeMenu: 'Dashboard'});    
        this.props.history.push('/dashboard');
        this.setState((state) => {
            return {
                drawerOpen: !state.drawerOpen
            }
        });
    }

    decideNavigationForPayment() {
        this.props.history.push('/home')

    }

    async componentDidMount() {
        // await Auth.currentSession().then(res => {
        await fetchAuthSession().then(res => {
            let jwt = res["idToken"]["jwtToken"]
            StorageService.set(StorageKeys.clientJwt, jwt);
        })
        this.getUserInfo()
    }

    handleViewDetails = (event) => {
        this.setState({
            anchorElViewDetails: true
        })
    };

    handleCloseViewDetails = () => {
        this.setState({
            anchorElViewDetails: false
        })
    };

    handleOpenUserMenu = () => {
        this.setState({
            anchorElUser: true
        })
    };

    handleOpenNavMenu = (event) => {
        this.setState({
            anchorElNav: true
        })
    };

    handleCloseNavMenu = () => {
        this.setState({
            anchorElNav: false
        })
    };

    handleCloseUserMenu = () => {
        this.setState({
            anchorElUser: false
        })
    };

    navigateToChangePassword = async () => {
        // console.log('navigateToChangePassword')
        const { history } = this.props;
        history.push('/changepassword');
    };

    navigateToProfile = async () => {
        // console.log('navigateToProfile')
        const { history } = this.props;
        history.push('/profile');
    };


    signOut = async () => {
        try {
            StorageService.clearAll();
            StorageService.clearAllLocalStorage();
            StorageService.clearAllTempStorage();
            await signOut();
        } catch (error) {
            toast("Something went wrong, please try again later", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: "toast-message toast-error",
            });
            // console.log('error signing out: ', error);
        }
    }

    // componentDidMount = async () => {
    //     console.log("IN here", this.props);
    // }

    render = () => html.apply(this);
    
}

function mapStateToProps(state) {
    return {
        commonEvent: state.commonEvent,
        device: state.device,
    }

}


export default connect(mapStateToProps)(withRouter(AppHeader));
