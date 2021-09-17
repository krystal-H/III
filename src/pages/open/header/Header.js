import React, { PureComponent } from 'react'
import {
    CaretDownOutlined,
    UserOutlined,
    BellOutlined,

} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { post, Paths } from '../../../api'
import { userNavRoutes } from '../../../configs/route.config';
import DefaultUserIcon from '../../../assets/images/userIcon.png'

import './Header.scss'

const LOGO_TEXT = '物联网云平台';
//消息类型
function getMessageType(text) {
    if (text == 1) {
        return '系统公告'
    }
    if (text == 2) {
        return '流程消息'
    }
    if (text == 31) {
        return 'APP控制服务'
    }
    if (text == 32) {
        return '云端定时服务'
    }
    if (text == 33) {
        return '场景联动服务'
    }
    return ''
}
export default class Header extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            messageList: [], // 产品列表
        }
    }
    logout = () => {
        post(Paths.logout, {}, { loading: true }).then(() => {
            window.location = window.location.origin + window.location.pathname + '#/account/login';
        })
    }
    componentDidMount() {
        this.getProductListNew()
    }

    // 获取产品列表
    getProductListNew = () => {
        let params = { "pager": { "pageIndex": 1, "pageRows": 4 } }
        post(Paths.getNoticeList, params)
            .then(res => {

                this.setState({
                    messageList: res.data.list,
                })
            })
    }
    goMore = () => {
        window.location = window.location.origin + window.location.pathname + '#/messageCenter/list';
    }
    render() {
        const { onlyLogo, developerInfo = {}, newMessageNums = {}, history } = this.props,
            { userName, isSubUser } = developerInfo,
            { totalUnRead } = newMessageNums;
        let { childmenus } = userNavRoutes[0];

        if (isSubUser) {
            childmenus = childmenus.slice(0, 2) // 子账号只有前两项  基本资料  安全设置  两个菜单
        }
        const { messageList } = this.state
        const menu = messageList.map(item => {
            return <div key={item.noticeId}>{item}
                【{getMessageType(item.noticeType)} 】{item.noticeTitle}</div>
        })

        return (
            <header className="mainpage-header">
                <span className="logo">{LOGO_TEXT}</span>
                {
                    !onlyLogo &&
                    <div className='right'>
                        <a href="https://dp.clife.net/iotdoc" target="_blank">帮助文档</a>
                        <Link to="/open/repairOrder" >工单</Link>
                        <Dropdown overlay={
                            <div className='message-wrap'>
                                <div className='title'>消息</div>
                                {
                                    messageList.map((item, index) => {
                                        return <div key={index} className='message-item'>
                                            <div className='name'>
                                                <div className='text'>【{getMessageType(item.noticeType)} 】{item.noticeTitle}</div>
                                                {!item.isRead && <div className='count-dot'></div>}
                                            </div>
                                            <div className='time'>{item.updateTime}</div>
                                        </div>
                                    })
                                }
                                <div className='more'>
                                    <Link to="/messageCenter/list" >查看所有消息》</Link>
                                </div>
                            </div>
                        } overlayClassName='home-message-top' >
                            <Link to="/messageCenter" target="_blank">
                                <BellOutlined className='bellicon' />
                                {totalUnRead && <span className='msgnum'> {totalUnRead > 99 ? 99 : totalUnRead} </span> || null}
                            </Link>
                        </Dropdown>

                        <div className='user'>
                            <img src={DefaultUserIcon} alt="用户头像" className="usericon" />
                            <span className='username'>{userName || '未知账号'}</span>
                            <CaretDownOutlined className='downicon' />
                            <div className='hoverbox'>
                                <div className='comm-shadowbox menubox'>
                                    <div className='userbox'>
                                        {
                                            childmenus.map(({
                                                menuname, path, menuicon
                                            }, index) => {
                                                return <Link key={index} className="li" to={path} target="_blank">
                                                    <UserOutlined />
                                                    <span className='txt'>{menuname}</span>
                                                </Link>
                                            })
                                        }
                                    </div>
                                    <div className='logout'><span className='click' onClick={this.logout}>退出账号</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </header>
        );
    }
}