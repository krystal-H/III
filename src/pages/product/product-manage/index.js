import React from 'react';
import { Switch,Route,Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
const ProductList = loadable( () => import('./product-list/List'));
const ProductEdit = loadable( () => import('./product-edit/ProductEdit'));
const ProductDetails = loadable( () => import('./product-details/ProductDetails'));
const OldProductDetails = loadable( () => import('./old-product-details/ProductDetails'));//5.x版本之前的旧产品
export default function ProductManage({ match }) {
    let {path} = match;
    return (
        <Switch>
            <Route path={`${path}/list`} component={ProductList}></Route>
            <Route path={`${path}/edit/:id`} component={ProductEdit}></Route>
            <Route path={`${path}/details/:id`} component={ProductDetails}></Route>
            <Route path={`${path}/detail/:id`} component={OldProductDetails}></Route>
            <Redirect to={`${path}/list`}></Redirect>
        </Switch>
    )
}
