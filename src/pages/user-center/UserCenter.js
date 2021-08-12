import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';

import UserInfo from './user-info/UserInfo';
import RoleManagement from './roleManagement/index';
import UserVisit from './user-visit/index';
import OperateLog from './operate-log/OperateLog';
import SecuritySetting from './security-setting/SecuritySetting';

import OutsideWrapper from '../../components/outside-wrapper/OutsideWrapper';
import Header from '../../pages/open/header/Header'
import NavMenu from '../../pages/open/nav-menu/NavMenu';

import {getNewMessageNums} from '../message-center/store/ActionCreator';
import {getDeveloperInfo} from './store/ActionCreator';
import {userNavRoutes} from '../../configs/route.config';
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNewMessageNums: () => dispatch(getNewMessageNums()),
        getDeveloperInfo: () => dispatch(getDeveloperInfo()),
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UserCenter extends Component {
    componentDidMount () {
        let {newMessageNums,getNewMessageNums,getDeveloperInfo,developerInfo} = this.props;
        
        if (isEmpty(newMessageNums)) {
            getNewMessageNums()
        }

        if (isEmpty(developerInfo)) {
            getDeveloperInfo()
        }
    }
    render() {
        const {developerInfo,newMessageNums,getDeveloperInfo} = this.props;
        const isNotSub = !(developerInfo.isSubUser === 1);//非子账号
        let childmenus = userNavRoutes[0].childmenus;
        if(!isNotSub){
            childmenus = [childmenus[0],childmenus[1]] // 子账号只有前两项  基本资料  安全设置  两个菜单
        }
        return (
            <OutsideWrapper>
                <div className="page-header-wrapper">
                    <Header developerInfo={developerInfo} newMessageNums={newMessageNums}></Header>
                </div>
                <div className="page-content-wrapper">
                    <div className={'left-menus'}>
                        <NavMenu menulist={userNavRoutes} ></NavMenu>
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
                                {childmenus[0]&&<Redirect to={childmenus[0].path}></Redirect>}
                            </Switch>
                        </div>
                    </section>
                </div>  
            </OutsideWrapper>
        )
    }
}
