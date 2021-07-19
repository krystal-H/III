import React, { Component } from 'react';
import { Switch,Redirect,Route } from 'react-router-dom';

import ServiceConfig from './service-config/service-config';
import AppControl from './app-control/AppControl';
import CloudTime from './cloud-time/CloudTime';
import SceneLink from './scene-link/SceneLink';

import './ProductServices.scss';

export default class ProductServices extends Component {
    render() {
        let {productId,match,canOperate} = this.props,
        {path} = match;
        
        return (
            <Switch>
                <Route path={`${path}/serviceConfig`} render={(props) => <ServiceConfig {...props} productId={productId}></ServiceConfig>}></Route>
                <Route path={`${path}/appcontrol`} render={(props) => <AppControl {...props} canOperate={canOperate} productId={productId}></AppControl>}></Route>
                <Route path={`${path}/cloudtime`} render={(props) => <CloudTime {...props} canOperate={canOperate} productId={productId}></CloudTime>}></Route>
                <Route path={`${path}/scenelink`} render={(props) => <SceneLink {...props} canOperate={canOperate} productId={productId}></SceneLink>}></Route>
                <Redirect to={`${path}/serviceConfig`}></Redirect>
            </Switch>
        )
    }
}