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
const Project = loadable(() => import('../project'))

// 有接口了menuList1这个要该回去的！！！！！
const menuList1 = [
    {
        menuname: '总览',
        path: '/open/home',
        menuicon: 'zonglan',
        menuid: '0'
    }, {
        menuname: '产品',
        path: '/open/product',
        menuicon: 'chanpin',
        menuid: '1',
        childmenus: [
            {
                menuname: '产品管理',
                path: '/open/product/proManage',
                menuid: '1-0',
            },
            {
                menuname: '设备注册',
                path: '/open/product/devRegist',
                menuid: '1-1',
            },
            {
                menuname: '固件升级',
                path: '/open/product/otaUpdate',
                menuid: '1-2',

            },
            {
                menuname: '场景服务',
                path: '/open/product/ruleEngine',
                menuid: '1-3',
            },
            {
                menuname: '云端定时',
                path: '/open/product/cloudTimer',
                menuid: '1-4',

            },
            {
                menuname: '远程配置',
                path: '/open/product/remoteCofig',
                menuid: '1-5',
            },
        ]
    }, {
        menuname: '设备',
        path: '/open/device',
        menuicon: 'shebei',
        menuid: '2',
        childmenus: [
            {
                menuname: '设备管理',
                path: '/open/device/devManage',
                menuid: '2-0',

            },
            // {
            //     menuname: '设备秘钥',
            //     path: '/open/device/devSecret',
            //     menuid:'2-1',
            // },
            {
                menuname: '设备分组',
                path: '/open/device/devGroup',
                menuid: '2-2',

            },
            {
                menuname: '设备消息',
                path: '/open/device/devMsg',
                menuid: '2-3',
            }
        ]
    }, {
        menuname: '应用',
        path: '/open/app',
        menuicon: 'app',
        menuid: '3',
        childmenus: [
            {
                menuname: '应用管理',
                path: '/open/app',
                menuid: '3-0',
            },
        ]
    },
    {
        menuname: '数据',
        path: '/open/serve',
        menuicon: 'shujufw',
        menuid: '4',
        childmenus: [
            {
                menuname: '设备分析',
                path: '/open/serve/device',
                menuid: '4-0',

            },
            {
                menuname: '用户分析',
                path: '/open/serve/user',
                menuid: '4-1',
            },
            {
                menuname: '数据订阅',
                path: '/open/serve/dataSub',
                menuid: '4-2',

            }
        ]
    },
    {
        menuname: '项目',
        path: '/open/project',
        menuicon: 'shujufw',
        menuid: '5',
        childmenus: [
            {
                menuname: '项目管理',
                path: '/open/project/projectMgt',
                menuid: '5-0',

            },
        ]
    }
    // {
    //     menuname: '数据服务',
    //     path: '/open/serve',
    //     menuicon: 'shujufw',
    //     menuid:'4',
    // }
    // {
    //     menuname: '开发Studio',
    //     path: '/open/studio',
    //     menuicon: 'studio',
    //     menuid:'5',
    //     childmenus: [
    //         {
    //             menuname: '项目管理',
    //             path: '/open/studio/project',
    //             menuid:'5-0',

    //         },
    //         {
    //             menuname: '服务开发',
    //             path: '/open/studio/serve',
    //             menuid:'5-1',
    //         }
    //     ]
    // }
]

const RouteComponentLi = {
    '总览': Overview,
    '产品': Product,
    '设备': Device,
    '应用': Application,
    '数据': DataSevice,
    '项目': Project
    // '开发Studio': , 暂时取消 开发Studio 20210810
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
        if (this.props.menulist.length == 0) {
            this.props.getMenuList();
        }
    }
    render() {
        const { developerInfo, newMessageNums, menulist } = this.props;
        const { collapsed } = this.state;
        return (
            <OutsideWrapper>
                <section className="page-header-wrapper">
                    <Header developerInfo={developerInfo} newMessageNums={newMessageNums} ></Header>
                </section>
                <div className="page-content-wrapper">
                    <div className={`left-menus${collapsed ? ' collap' : ''}`}>
                        <NavMenu menulist={menulist} collapsed={collapsed} ></NavMenu>
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
                                    menuList1.map(({
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