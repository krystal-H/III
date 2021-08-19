import React from 'react'
import {Switch,Redirect,Route} from 'react-router-dom'
import ResetPassword from './reset-password/ResetPassword'
import UpdateEmail from './update-email/UpdateEmail'
import CloseAccount from './close-account/CloseAccount'
import SubResetPassword from './SubResetPassword';
import Setting from './SecuritySetting';

import './SecuritySetting.scss'

export default function SecuritySetting ({developerInfo,getDeveloperInfo,isNotSub,match}) {
    const {path} = match;
    return (
        <Switch>
            <Route path={`${path}/setting`} 
                render={routeProps => <Setting {...routeProps} developerInfo={developerInfo} getDeveloperInfo={getDeveloperInfo} isNotSub={isNotSub} />}
            >
            </Route>
            {
                isNotSub ?
                <Route path={`${path}/resetPassword`} 
                    render={routeProps => <ResetPassword {...routeProps} developerInfo={developerInfo} />}
                ></Route> :
                <Route path={`${path}/subResetPassword`} 
                    render={routeProps => <SubResetPassword {...routeProps} developerInfo={developerInfo} />}
                ></Route>
            }
            {
                isNotSub&&
                <Route path={`${path}/updateEmail`} 
                    render={routeProps => <UpdateEmail {...routeProps} developerInfo={developerInfo} />}
                ></Route>
            }
            {
                isNotSub&&
                <Route path={`${path}/closeAccount`} 
                    render={routeProps => <CloseAccount {...routeProps} developerInfo={developerInfo} />}
                ></Route>
            }
            
            <Redirect to={`${path}/setting`}></Redirect>
        </Switch>
    )
}