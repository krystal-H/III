
import React from 'react'
import {Switch,Redirect,Route} from 'react-router-dom'

import List from './UserVisit'
import Detail from './UserLook'

export default ({match}) => {
    const {path} = match;
    return (
        <Switch>
            <Route path={`${path}/list`} component={List}></Route>
            <Route path={`${path}/detail`} component={Detail}></Route>
            <Redirect to={`${path}/list`}></Redirect>
        </Switch>
    )
}
