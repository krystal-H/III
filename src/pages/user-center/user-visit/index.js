
import React from 'react'
import {Switch,Redirect,Route} from 'react-router-dom'

import List from './UserVisit'
import Detail from './UserLook'

export default (_props) => {
    const {path} = _props.match;
    return (
        <Switch>


            <Route path={`${path}/list`} render={routeProps => <List {...routeProps} {..._props} />}></Route>
            <Route path={`${path}/detail`} render={routeProps => <Detail {...routeProps} {..._props} />}></Route>
            <Redirect to={`${path}/list`}></Redirect>



        </Switch>
    )
}
