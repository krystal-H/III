import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Modal} from 'antd';
import { HashRouter as Router, Switch } from "react-router-dom";
import { ConfigProvider } from 'antd';
import {config} from '../configs/antd.config';
import store from '../store';
import {mainRoutes,RouteWithSubRoutes} from '../configs/route.config';
import GuideToLogin from '../pages/user-center/guide-to-login/GuideToLogin';
import Loading from '../components/loading/Loading';
import CustomerService from './customerService';

import './App.scss';

export default class App extends Component {

    componentDidCatch(error, info) {
        console.log('Error::::', error);
        console.log('info', info);
        if (String(error).includes('Loading chunk')) {
            window.location.reload();
        }
    }

    // 自定义确认弹框
    customConfirm = (message,callback) => {
        Modal.confirm({
            title:message,
            onCancel: () => {
                callback(false);
              },
              onOk: () => {
                callback(true);
              }
        })
    }
    render() {   
        
        return (
            <ConfigProvider locale={config.locale} >
                <Provider store={store}>
                    <Router getUserConfirmation={this.customConfirm}>
                        <Loading />
                        <Switch>
                            {
                                // 项目创建时，路由使用的是配置管理，后来发现会导致打包无法分包的问题，就放弃了此种方式；只有此处保留了这种用法，用于向下层组件传递部分路由配置数据
                                mainRoutes.map((route,i) => {
                                    return <RouteWithSubRoutes key={i} {...route}></RouteWithSubRoutes>
                                })
                            }
                        </Switch>
                        <CustomerService />
                        <GuideToLogin></GuideToLogin>
                    </Router>
                </Provider>
                
            </ConfigProvider>
        )
    }
}
