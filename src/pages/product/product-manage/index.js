import React from 'react';
import { Switch,Route,Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

import ProductList from './product-list/List';
import ProductDetails from './product-details/ProductDetails';

const ProductEdit = loadable( () => import('./product-edit/ProductEdit'));
const DeviceDebugging = loadable( () => import('./deviceDebugging/deviceDebuggerTest/StartTest'));

export default function ProductManage({ match }) {
    let {path} = match;
    return (
        <Switch>
            <Route path={`${path}/list`} component={ProductList}></Route>
            <Route path={`${path}/edit/:id`} component={ProductEdit}></Route>
            <Route path={`${path}/details/:id`} component={ProductDetails}></Route>
            <Route path={`${path}/deviceDebugging`} component={DeviceDebugging}></Route>
            <Redirect to={`${path}/list`}></Redirect>
        </Switch>
    )
}
