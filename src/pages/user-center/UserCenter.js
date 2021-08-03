import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';

import UserInfo from './user-info/UserInfo';
import RoleManagement from './roleManagement/RoleManagementList';
import AddRole from './roleManagement/AddRole';
import UserVisit from './user-visit/UserVisit';
import UserLook from './user-visit/UserLook';
import OperateLog from './operate-log/OperateLog';
import SecuritySetting from './security-setting/SecuritySetting';

import OutsideWrapper from '../../components/outside-wrapper/OutsideWrapper'
import Header from '../../pages/open/header/Header'
import NavMenu from '../../pages/open/nav-menu/NavMenu';

import {getNewMessageNums} from '../message-center/store/ActionCreator'
import {getDeveloperInfo,getMenuList} from './store/ActionCreator';

import './UserCenter.scss'


const RouteComponentLi ={
    '基本资料':UserInfo,
    '安全设置':SecuritySetting,
    '访问用户':UserVisit,
    '用户角色':RoleManagement,
    '操作日志':OperateLog,
}
const mapStateToProps = state => {
    return {
        developerInfo: state.getIn(['userCenter', 'developerInfo']).toJS(),
        newMessageNums: state.getIn(['message', 'newMessageNums']).toJS(),
        menulist: state.getIn(['userCenter', 'menulist']).toJS(),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNewMessageNums: () => dispatch(getNewMessageNums()),
        getDeveloperInfo: () => dispatch(getDeveloperInfo()),
        getMenuList: () => dispatch(getMenuList()),
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UserCenter extends Component {
    componentDidMount () {
        let {newMessageNums,getNewMessageNums,getDeveloperInfo,developerInfo,getMenuList} = this.props;
        getMenuList();
        if (isEmpty(newMessageNums)) {
            getNewMessageNums()
        }

        if (isEmpty(developerInfo)) {
            getDeveloperInfo()
        }
    }
    render() {
        let {developerInfo,newMessageNums,match,getDeveloperInfo,menulist:{userMenu=[]}} = this.props,
            {path} = match,
            {childmenus=[]} = userMenu[0] || {},
            isNotSub = !(developerInfo.isSubUser === 1);//非子账号
        console.log(55555,this.props.menulist)
        return (
            <OutsideWrapper>
                <div className="page-header-wrapper">
                    <Header newMessageNums={newMessageNums} developerInfo={developerInfo} ></Header>
                </div>
                <div className="page-content-wrapper">
                    <div className={'left-menus'}>
                        <NavMenu menulist={userMenu} ></NavMenu>
                    </div>
                    <section className="right-wrapper">
                        <div className="right-wrapper-contentbox">
                            <Switch>
                                {
                                    childmenus.map(({
                                        menuname,path, ...rest
                                    },index)=>{
                                        const RouteComponent = RouteComponentLi[menuname];
                                        if(RouteComponent){
                                            return <Route key={index} path={path} 
                                                    render={props => <RouteComponent developerInfo={developerInfo} getDeveloperInfo={getDeveloperInfo} isNotSub={isNotSub} {...props} {...rest} />}
                                                ></Route>
                                        }
                                    })
                                }
                                {
                                    isNotSub&&<Route path={`${path}/look`} component={UserLook}></Route>
                                }
                                {
                                    isNotSub&&<Route path={`${path}/add`} component={AddRole}></Route>
                                }
                                {childmenus[0]&&<Redirect to={childmenus[0].path}></Redirect>}
                            </Switch>
                        </div>
                    </section>
                </div>  
            </OutsideWrapper>
        )
    }
}
