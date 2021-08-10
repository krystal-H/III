import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { connect } from 'react-redux';
import { getDeveloperInfo, getMenuList } from '../user-center/store/ActionCreator';
import { getNewMessageNums } from '../message-center/store/ActionCreator';

import OutsideWrapper from '../../components/outside-wrapper/OutsideWrapper';
import Header from './header/Header';
import NavMenu from './nav-menu/NavMenu';
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons';
// 模块懒加载
// const BigDataProduct = loadable( () => import('../big-data-product/BigDataProduct'));
// const DevelopCenter = loadable( () => import('../develop-center/DevelopCenter'));
const Overview = loadable(() => import('../home/overview/index'));
const Product = loadable(() => import('../product'));
const Device = loadable(() => import('../device'));
const DataSevice = loadable(() => import('../data-sevice'));
const OrderHome = loadable(() => import('../repairOrder/home'));
const Application = loadable(() => import('../product/application/Application.js'))

const RouteComponentLi = {
    '总览': Overview,
    '产品': Product,
    '设备': Device,
    'APP': Application,
    '数据服务': DataSevice,
    '开发Studio': Product,
}
const RepairOrder = [{
    name: '工单主页',
    compo: OrderHome,
    path: '/open/repairOrder'
}]
const mapStateToProps = state => {
    return {
        developerInfo: state.getIn(['userCenter', 'developerInfo']).toJS(),
        menulist: state.getIn(['userCenter', 'menulist']).toJS(),
        newMessageNums: state.getIn(['message', 'newMessageNums']).toJS(),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDeveloperInfo: () => dispatch(getDeveloperInfo()),
        getNewMessageNums: () => dispatch(getNewMessageNums()),
        getMenuList: () => dispatch(getMenuList()),
    }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Open extends Component {
    state = {
        collapsed: false //左侧菜单收缩切换
    }
    setCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    componentDidMount() {
        // 请求用户信息
        this.props.getDeveloperInfo();
        this.props.getNewMessageNums();
        /*
            登录时候 getMenuList 过，但是登入后若页面刷则需要重新请求menulist，
            如果页面没刷新一直有muenList，则不用再请求
        */
        if (this.props.menulist.navMenu.length == 0) {
            this.props.getMenuList();
        }
    }
    render() {
        const { match, developerInfo, newMessageNums, menulist: { navMenu, userMenu } } = this.props;
        const { collapsed } = this.state, { path } = match;
        return (
            <OutsideWrapper>
                <section className="page-header-wrapper">
                    <Header developerInfo={developerInfo} newMessageNums={newMessageNums} menulist={userMenu} ></Header>
                </section>
                <div className="page-content-wrapper">
                    <div className={`left-menus${collapsed ? ' collap' : ''}`}>
                        <NavMenu menulist={navMenu} collapsed={collapsed} ></NavMenu>
                        <div className='trigger-coll' onClick={this.setCollapsed}>
                            <span className='icon'>{
                                collapsed && <MenuUnfoldOutlined /> || <MenuFoldOutlined />
                            }</span>
                            {!collapsed && '收起菜单'}
                        </div>
                    </div>
                    <section className="right-wrapper">
                        <div className="right-wrapper-contentbox">
                            <Switch>
                                {/* {
                                    muenList.map((item,index)=>{
                                        if(item.menuname=='基础产品'){
                                            return <Route key='基础产品' path={`${path}/base`}
                                                render={props => <Base muenList={item.menus} {...props}></Base>}
                                            ></Route>
                                        }else if(item.menuname=='大数据服务'){
                                            return <Route key='大数据服务' path={`${path}/bigData`}
                                                render={props => <BigDataProduct muenList={item.menus} {...props}></BigDataProduct>}
                                            ></Route>
                                        } else if(item.menuname=='开发中心'){
                                            return <Route key='开发中心' path={`${path}/developCenter`}
                                                render={props => <DevelopCenter muenList={item.menus} {...props}></DevelopCenter>}
                                            ></Route>
                                        }
                                    })
                                } */}

                                {
                                    navMenu.map(({
                                        menuname, path, ...rest
                                    }, index) => {
                                        const RouteComponent = RouteComponentLi[menuname];
                                        if (RouteComponent) {
                                            return <Route key={index} path={path}
                                                render={props => <RouteComponent {...props} {...rest} />}
                                            ></Route>
                                        }
                                    })
                                }
                                {
                                    RepairOrder.map(({
                                        compo, path
                                    }, index) => {
                                        return <Route key={index} path={path}
                                        component={compo}
                                        ></Route>
                                    })
                                }
                                {/* <Route key={1} path={'/open/home'} 
                                    render={props => <Overview {...props} />}
                                ></Route>

                                <Route key={2} path={'/open/product'} 
                                    render={props => <Product {...props} />}
                                ></Route> */}

                                {/* <Redirect to={`${path}/home`}></Redirect> */}
                            </Switch>
                        </div>
                    </section>
                </div>
            </OutsideWrapper>
        )
    }
}