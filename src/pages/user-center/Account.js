import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';
import ForgotPassword from './forgot-password/ForgotPassWord';

import './Account.scss';

export default function Account({match}) {
    let {path} = match;
    return (
        <div className="account-wrapper">
            <Switch>
                <Route path={`${path}/login`} component={Login}></Route>
                <Route path={`${path}/register`} component={Register}></Route>
                <Route path={`${path}/forgtopassword`} component={ForgotPassword}></Route>
                <Redirect to={`${path}/login`}></Redirect>
            </Switch>
        </div>
    )
}
