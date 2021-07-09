import React,{ Component} from 'react';
import { Switch,Route,Redirect} from 'react-router-dom';
import loadable from '@loadable/component';
import {connect} from 'react-redux';
import {getDeveloperInfo,getMenuList} from '../user-center/store/ActionCreator';
import {getNewMessageNums} from '../message-center/store/ActionCreator';

import OutsideWrapper  from '../../components/outside-wrapper/OutsideWrapper';
import Header from './header/Header';
import NavMenu from './nav-menu/NavMenu';
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons';

// 模块懒加载
// const BigDataProduct = loadable( () => import('../big-data-product/BigDataProduct'));
// const DevelopCenter = loadable( () => import('../develop-center/DevelopCenter'));
const Overview = loadable( () => import('../home/overview/index'));
const Product = loadable( () => import('../product'));

const RouteComponentLi ={
    '总览':Overview,
    '产品':Product,
    '设备':Overview,
    'APP':Product,
    '数据服务':Overview,
    '开发Studio':Product,
}

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
        collapsed:false //左侧菜单收缩切换
    }
    setCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    
    componentDidMount(){
        // 请求用户信息
        this.props.getDeveloperInfo();
        this.props.getNewMessageNums();
        /*
            登录时候 getMenuList 过，但是登入后若页面刷则需要重新请求menulist，
            如果页面没刷新一直有muenList，则少请求一遍
        */
        if(this.props.menulist.length==0){
            this.props.getMenuList();
        }
    }
    render () {
        const { match ,developerInfo,newMessageNums,menulist} = this.props;
        const {collapsed} = this.state, {path} = match;
        return (
            <OutsideWrapper>
                <section className="page-header-wrapper">
                    <Header developerInfo={developerInfo} newMessageNums={newMessageNums} ></Header>
                </section>
                <div className="page-content-wrapper">
                    <div className={`left-menus${collapsed?' collap':''}`}> 
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger-coll',
                            onClick: this.setCollapsed,
                        })}
                        <NavMenu menulist={menulist} collapsed={collapsed} ></NavMenu>
                    </div>
                    <section className="right-wrapper flex-column">
                        <div className="flex1">
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
                                    menulist.map(({
                                        menuname,path, ...rest
                                    },index)=>{
                                        const RouteComponent = RouteComponentLi[menuname];
                                        if(RouteComponent){
                                            return <Route key={index} path={path} 
                                                    render={props => <RouteComponent {...props} {...rest} />}
                                                ></Route>
                                        }
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