import React, {Component, Fragment} from 'react';
// import {BrowserRouter, HashRouter, Navigate, Route, Switch} from "react-router-dom";
import {BrowserRouter, HashRouter, Redirect, Route, Switch} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Home from './components/home/home'
import AppFrame from "./components/app-frame/app-frame";
import fileUpload from './components/file-upload/file-upload';
import Reports from './components/reports/reports';
import { USER_TYPE } from '../src/service/core/storage.service';
import {TempStorage} from "../src/service/core/storage.service";
import UploadSettlement from "./components/admin/upload-settlement/upload-settlement";
import Merchant from './components/admin/merchants/merchant';
import ChangePasswordForm from './components/admin/change-password/password-change';
import SinglePayment from "./components/customer/payments/single-payment";
import Broadcasts from "./components/admin/broadcast/broadcasts";
import MerchantDashboard from './components/dashboard/merchant-dashboard';
import MerchantProfile from './components/admin/merchants/merchant-profile/merchant-profile';

export default class AppRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Route exact path='/' component={MerchantDashboard}/>
                <Route path='/' component={AppFrame}/>
            </BrowserRouter>
        );
    }
};

export const GuestRouter = () => {
    return (
        <>
            <Route exact path={`/`}>
                <Redirect to={`/dashboard`}/>
            </Route>
           
            <Route exact path='/home' component={Home}/>
            <Route exact path='/dashboard' component={MerchantDashboard}/>
            <Route exact path='/file-upload' component={fileUpload}/>
            <Route exact path='/reports' component={Reports}/>
            <Route exact path='/changepassword' component={ChangePasswordForm}/>
            <Route exact path={'/new-payment'} component={SinglePayment}/>
            <Route exact path={'/merchant-profile'}component={MerchantProfile}/>

            <Route exact path={'/invoice'}>
                <Redirect to={`/home`}/>
            </Route>
            <Route exact path={'/templates'}>
                <Redirect to={`/home`}/>
            </Route>
            <Route exact path={'/users'}>
                <Redirect to={`/home`}/>
            </Route>
            <Route exact path={'/profile'}>
                <Redirect to={`/home`}/>
            </Route>
            <Route exact path={`*`}>
                <Redirect to={`/dashboard`}/>
            </Route>
        </>
    );
};

export const AdminRouter= () => {
    return (
        <>
            <AdminUser>
                <Route exact path='/merchants' component={Merchant}/>
                <Route exact path='/upload-settlement' component={UploadSettlement}/>
                <Route exact path={'/broadcasts'} component={Broadcasts}/>
            </AdminUser>
        </>
    );
};

function AdminUser({children}){
    if(TempStorage.loginUserRole === USER_TYPE.ADMIN_USER){
        return <>{children}</>;
    }else{
        return <></>;
    }
}
