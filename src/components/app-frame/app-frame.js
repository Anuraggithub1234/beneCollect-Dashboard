import React, {Component, Fragment} from 'react';
import AppFooter from "./app-footer/app-footer";
import AppHeader from "./app-header/app-header";
import AppNavDrawer from "../$widgets/app-nav-drawer/app-nav-drawer";
import {TempStorage, USER_TYPE} from "../../service/core/storage.service";
import Action from "../../redux/action";
import {connect} from "react-redux";
// import {Route} from "../../app-router";
import {BrowserRouter, HashRouter as Router, Redirect, Route, Switch, Outlet} from "react-router-dom";
import {GuestRouter, AdminRouter} from "../../app-router";


class AppFrame extends Component {

    background = "white";
    padding = "8px 24px";

    constructor(props) {
        super(props);

        this.state = {
            navbarToggle: true
        }
    }

    componentDidUpdate(){
        if( window.location.pathname == "/dashboard" ){
            this.background = "transparent";
            this.padding = ".5rem";
        } else {
            this.background = "white";
            this.padding = "8px 24px";
        }
    }

    render() {
        const {match, device} = this.props;

        const setNavbarToggle = (val) => {
            this.setState({
                navbarToggle: val
            })
        }

        // return (
        //     <>
        //     <AppHeader navbarToggle={this.state.navbarToggle}/>
        //     <div className={'app-frame-main'}>
        //          <AppNavDrawer />
        //         <main className={'app-container mb-sm-5 p-0 p-lg-2'}>
        //             <GuestRouter/>
        //             <AdminRouter/>
        //         </main>
        //     </div>
        //         <AppFooter/>
        //     </>
        // );


        return (
            <>
            <div style={{display: 'flex', width: '100vw',height: '100vh', overflow: 'hidden', margin: '0', padding: '0', background: '#F6F6F6'}}>
                
                <AppNavDrawer navbarToggle={this.state.navbarToggle} setNavbarToggle={setNavbarToggle}/>
                
                <div id="mainOutletContainer" className='scrollbar-none transition' style={this.state.navbarToggle ? {width: `calc(100vw - 270px)`, maxWidth: '100%', height: '100vh' , overflow: 'hidden', position: 'relative', margin: "0"} : {width: `calc(100vw - 64px)`, maxWidth: '100%', height: '100vh' , overflow: 'hidden', position: 'relative', margin: "0"}}>
                    <div style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '72px'}}>
                        <AppHeader />
                    </div>
                    <div id="outletContainer" className="scrollbar-none" style={{width: '100%', height: `calc(100% - 72px)` , marginTop: '72px', overflowY: 'scroll', overflowX: 'hidden', padding: '0 16px'}}>
                        <main className={'app-container'} style={{minHeight: '100%',marginTop: '16px', background: this.background, padding: this.padding }}>
                            <GuestRouter/>
                            <AdminRouter/>
                        </main>
                        <div style={{marginTop: '16px'}}>
                            <AppFooter/>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );


    }

    onWindowResize = () => {
        const device = {
            width: document.documentElement.clientWidth,
            scale: 0,
            breakpoint: 'xs'
        }
        if (device.width > 1024) {
            device.scale = 3;
            device.breakpoint = 'lg';
            this.props.dispatch({type: Action.UpdateDevice, device});
        } else if (device.width > 720) {
            device.scale = 2;
            device.breakpoint = 'md';
            this.props.dispatch({type: Action.UpdateDevice, device});
        } else if (device.width > 600) {
            device.scale = 1;
            device.breakpoint = 'sm';
            this.props.dispatch({type: Action.UpdateDevice, device});
        } else {
            device.scale = 0;
            device.breakpoint = 'xs';
            this.props.dispatch({type: Action.UpdateDevice, device});
        }
    };

    componentDidMount = () => {
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);
    }
}

function mapStateToProps(state) {
    return {
        device: state.device,
    }
}

export default connect(mapStateToProps)(AppFrame);
