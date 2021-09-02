
import React from 'react'
import {Switch,Redirect,Route} from 'react-router-dom'

import List from './RoleManagementList'
import Edit from './Detail'

export default ({match}) => {
    const {path} = match;
    return (
        <Switch>
            <Route path={`${path}/list`} component={List}></Route>
            <Route path={`${path}/edit`} component={Edit}></Route>
            <Redirect to={`${path}/list`}></Redirect>
        </Switch>
    )
}
