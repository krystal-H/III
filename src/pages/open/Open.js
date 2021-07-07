import React,{ Component} from 'react';
import { Switch,Route,Redirect} from 'react-router-dom';
import loadable from '@loadable/component';
import {connect} from 'react-redux';
import {getDeveloperInfo,gatMuenList,updateMuenList} from '../user-center/store/ActionCreator';
import {getNewMessageNums} from '../message-center/store/ActionCreator';

import OutsideWrapper  from '../../components/outside-wrapper/OutsideWrapper';
import Header from './header/Header';
import NavMenu from './nav-menu/NavMenu';
import Base from '../base-product/BaseProduct';
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons';

// 模块懒加载
const BigDataProduct = loadable( () => import('../big-data-product/BigDataProduct'));
const DevelopCenter = loadable( () => import('../develop-center/DevelopCenter'));
const Overview = loadable( () => import('../home/overview/index'));

const mapStateToProps = state => {
    return {
        developerInfo: state.getIn(['userCenter', 'developerInfo']).toJS(),
        muenList: state.getIn(['userCenter', 'muenList']).toJS(),
        newMessageNums: state.getIn(['message', 'newMessageNums']).toJS(),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDeveloperInfo: () => dispatch(getDeveloperInfo()),
        updateMuenList: (data) => dispatch(updateMuenList(data)),
        gatMuenList: () => dispatch(gatMuenList()),
        getNewMessageNums: () => dispatch(getNewMessageNums()),
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

        if(JSON.parse(localStorage.getItem('menuList'))){
            this.props.updateMuenList(JSON.parse(localStorage.getItem('menuList')));
        }else{
            this.props.gatMuenList()
        }
    }
    render () {
        const { match,routes ,developerInfo,newMessageNums} = this.props;
        const {collapsed} = this.state, {path} = match
        let muenList = JSON.parse(localStorage.getItem('menuList'))||[];
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
                        <NavMenu muenList={muenList} routes={routes} collapsed={collapsed} ></NavMenu>
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
                                <Route key='开发中心' path={`${path}/developCenter`}
                                    render={props => <DevelopCenter {...props}></DevelopCenter>}
                                ></Route>

                                <Route key='首页' path={`${path}/home`}
                                    render={props => <Overview {...props}></Overview>}
                                ></Route>

                                <Route key='基础产品' path={`${path}/base`}
                                    render={props => <Base {...props}></Base>}
                                ></Route>

                                <Redirect from={`${path}/userCenter`} to="/userCenter"></Redirect>
                                <Redirect to={`${path}/home`}></Redirect>
                            </Switch>
                        </div>
                    </section>
                </div>
            </OutsideWrapper>
        )
    }
}