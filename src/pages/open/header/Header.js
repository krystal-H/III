import React,{PureComponent} from 'react'

import {
    CaretDownOutlined,
    ClusterOutlined,
    LogoutOutlined,
    SafetyCertificateOutlined,
    SnippetsOutlined,
    SoundOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Modal, Radio } from 'antd';
import {Link,withRouter} from 'react-router-dom';
import {post,Paths} from '../../../api'
import store from '../../../store'
import {updateProductListAction} from '../../../pages/base-product/product/store/ActionCreator'

import './Header.scss'

import LogoImg from '../../../assets/images/clife-logo.png'
import DefaultUserIcon from '../../../assets/images/common/userIcon@2x.png'

const LOGO_TEXT = '物联网云平台';

@withRouter
export default class Header extends PureComponent  {
    state={
        instanceMod:false,
        curInstanceId:localStorage.getItem('superInstanceId')
        
    }
    
    logout = () => {

        post(Paths.logout,{},{loading:true}).then(() => {
            store.dispatch(updateProductListAction({
                list:[],
                pager:{}
            }));
            window.location = window.location.origin + window.location.pathname + '#/account/login';
            localStorage.removeItem('menuList');//推出成功时，清除菜单缓存，只能放在跳转之后再执行。不然退出时就会出错
        })
    }
    render () {
        let {onlyLogo,developerInfo = {},newMessageNums={}} = this.props,
            {email,account,isSubUser} = developerInfo,
            {totalUnRead} = newMessageNums,
            messageIconClassName = '';
        
        if (totalUnRead) {
            messageIconClassName += " nums-wrapper"

            if (totalUnRead > 99) {
                totalUnRead = '99+'
                messageIconClassName += " max-num"
            }
        }

        return (
            <header className="page-header">
                <section className="logo">
                        <img src={LogoImg} alt="logo"/>
                        <span>{LOGO_TEXT}</span>
                </section>
                {
                    !onlyLogo && 
                    <React.Fragment>
                        
                        {/* 用户中心入口 */}
                        <section className="user-icon-wrapper">
                            <img src={DefaultUserIcon} alt="用户头像" className="user-img"/>
                            <CaretDownOutlined />
                            <div className="menus-wrapper">
                                <div className="icon-base-info">
                                    <span className="single-text" style={{flex:1}}>{email || account || '未获取到邮箱'}</span>
                                    <span className="right"
                                        onClick={this.logout}
                                        >
                                        <LogoutOutlined />
                                        &nbsp;退出
                                    </span>
                                </div>
                                <div className="user-menus">
                                    <div className="menus-item">
                                        <Link to="/userCenter/info" target="_blank">
                                            <span>
                                                <UserOutlined />
                                                &nbsp;基本资料</span>
                                        </Link>
                                    </div>
                                    {
                                        // 子账号（isSubUser：1）没有以下内容
                                        (isSubUser === 0 )&& 
                                        <React.Fragment>
                                            <div className="menus-item">
                                                <Link to="/userCenter/security" target="_blank">
                                                    <span>
                                                        <SafetyCertificateOutlined />
                                                        &nbsp;安全设置</span>
                                                </Link>
                                            </div>
                                            <div className="menus-item">
                                                <Link to="/userCenter/visit" target="_blank">
                                                    <span>
                                                        <TeamOutlined />
                                                        &nbsp;访问用户</span>
                                                </Link>
                                            </div>
                                            <div className="menus-item">
                                                <Link to="/userCenter/role" target="_blank">
                                                    <span>
                                                        <ClusterOutlined />
                                                        &nbsp;用户角色</span>
                                                </Link>
                                            </div>
                                            <div className="menus-item">
                                                <Link to="/userCenter/log" target="_blank">
                                                    <span>
                                                        <SnippetsOutlined />
                                                        &nbsp;操作日志</span>
                                                </Link>
                                            </div>
                                            <div className="menus-item">
                                                <Link to="/userCenter/case" target="_blank">
                                                    <span>
                                                        <SnippetsOutlined />
                                                        &nbsp;实例管理</span>
                                                </Link>
                                            </div>
                                            <div className="menus-item">
                                                <Link to="/userCenter/authorize" target="_blank">
                                                    <span>
                                                        <SnippetsOutlined />
                                                        &nbsp;授权管理</span>
                                                </Link>
                                            </div>
                                            <div className="menus-item">
                                                <Link to="/userCenter/dataasset" target="_blank">
                                                    <span>
                                                        <SnippetsOutlined />
                                                        &nbsp;数据资产</span>
                                                </Link>
                                            </div>
                                        </React.Fragment>
                                    }
                                </div>
                            </div>
                        </section>
                        {/* 消息中心入口 */}
                        <section className="message-icon">
                            <Link to="/messageCenter" target="_blank">
                                <SoundOutlined data-nums={totalUnRead} className={messageIconClassName} />
                            </Link>
                            
                        </section>
                    </React.Fragment>
                }
            </header>
        );
    }
}
