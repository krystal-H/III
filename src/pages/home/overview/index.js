import React, { useEffect, useCallback, useState } from 'react'
import { Carousel, Button,Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    RightOutlined,
} from '@ant-design/icons';
import { post, Paths, get } from '../../../api';
import store from '../../../store';
import {showCustomerService} from '../../customerService/store/reducer'
import moment from 'moment';
import AddProductModal from '../../product/product-manage/addProduct/addProduct'
import { Notification } from './../../../components/Notification';
import './index.scss';
//==产品管理图片
import projectmn1 from './../../../assets/images/overImage/project1.png';
import projectmn2 from './../../../assets/images/overImage/project2.png';
import projectmn3 from './../../../assets/images/overImage/project3.png';
import projectmn4 from './../../../assets/images/overImage/project4.png';
import projectmn5 from './../../../assets/images/overImage/project5.png';
//==快速入口图片
import quick1 from './../../../assets/images/overImage/quick1.png';
import quick2 from './../../../assets/images/overImage/quick2.png';
//==新建产品图片
import newproduct1 from './../../../assets/images/overImage/newproduct1.png';
import newproduct2 from './../../../assets/images/overImage/newproduct2.png';
import newproduct3 from './../../../assets/images/overImage/newproduct3.png';
import newproduct4 from './../../../assets/images/overImage/newproduct4.png';
import newproduct5 from './../../../assets/images/overImage/newproduct5.png';
import processimg from './../../../assets/images/overImage/processimg.png';
//==数据服务图片
import dataservice1 from './../../../assets/images/overImage/dataservice1.png';
import dataservice2 from './../../../assets/images/overImage/dataservice2.png';
import dataservice3 from './../../../assets/images/overImage/dataservice3.png';
//==帮助图片
import help1 from './../../../assets/images/overImage/help1.png';
import help2 from './../../../assets/images/overImage/help2.png';
import help3 from './../../../assets/images/overImage/help3.png';
import banner from './../../../assets/images/overImage/banner.png';
import noData from './../../../assets/images/overImage/noData.png';

export default function OverviewWrap() {
    useEffect(() => {
        getBannerList()
        getMessageList()
        getAppList()
        getDevOneList()
        getDevThreeList()
        getProductCount()
        getProductList()

    }, [])
    let history = useHistory();
    //轮播图
    const [bannerArr, setBannerArr] = useState([])
    const getBannerList = () => {
        post(Paths.homeBanner).then((res) => {
            setBannerArr(res.data.list)
        });
    }
    //消息列表 
    const [messageList, setMessageList] = useState([])
    const getMessageList = () => {
        let params = { "pager": { "pageIndex": 1, "pageRows": 10 } }
        post(Paths.getNoticeList, params).then((res) => {
            if (res.data.list.length > 3) {
                setMessageList(res.data.list.slice(0, 3))
            } else {
                setMessageList(res.data.list)
            }

        });
    }
    const goMessageDetail = (id) => {
        history.push(`/messageCenter/detail/${id}`);
    }
    //去工单
    const goOrder = () => {
        history.push(`/open/repairOrder`);
    }
    //app列表
    const [appList, setAppList] = useState([])
    const getAppList = () => {
        post(Paths.getAppInfoList, {}).then((res) => {
            if (res.data.list.length > 3) {
                setAppList(res.data.list.slice(0, 3))
            } else {
                setAppList(res.data.list)
            }
        })
    }
    //设备列表
    const [devOneList, setDevOneList] = useState({
        exception: '--', total: '--', totalActive: '--', todayActive: '--'
    })
    const getDevOneList = () => {
        post(Paths.devMnCount).then((res) => {
            setDevOneList(res.data)
        });
    }
    // const [devTwoList, setDevTwoList] = useState({ burn: 0, total: 0, active: 0, unactive: 0 })
    // const getDevTwoList = () => {
    //     post(Paths.devSecreCount).then((res) => {
    //         setDevTwoList(res.data)
    //     });
    // }
    const [devThreeList, setDevThreeList] = useState({ processed: '--', lastWarnTime: "--", pending: '--', send: '--' })
    const getDevThreeList = () => {
        post(Paths.devWarnCount).then((res) => {
            setDevThreeList(res.data)
        });
    }
    //产品统计
    const [productCount, setProductCount] = useState({ online: '--', fault: '--', total: '--', devTotal: '--' })
    const getProductCount = () => {
        post(Paths.productCount).then((res) => {
            setProductCount(res.data)
        });
    }
    //产品列表
    const [produList, setProductList] = useState([])
    const getProductList = () => {
        post(Paths.getProductListNew, { "current": 1, "size": 3 }).then(res => {
            if (res.data.records && res.data.records.length) {
                setProductList(res.data.records)
            }
        })
    }
    const productStatuFilter = (value) => {
        // (0开发模式 ,1生产模式，2-审核中)
        if (value == 0) {
            return '开发中'
        }
        if (value == 2) {
            return '审核中'
        }
        return '已发布'
    }
    //快捷入口
    const [newProductModal, setNewProductModal] = useState(false)
    //新增产品
    const openNewProduct = () => {
        let isShow = false
        function isGo(menuS) {
            menuS.forEach(item => {
                if (item.menuname == '产品管理') {
                    isShow = true
                }
                if (item.childmenus) {
                    isGo(item.childmenus)
                }
            })
        }
        isGo(menulist)
        if (isShow) {
            setNewProductModal(true)
        } else {
            Notification({
                description: '无权限！',
            });
        }

    }
    const closeNewProduct = () => {
        setNewProductModal(false)
    }
    const goApp = () => {
        history.push(`/open/app/list`);
    }
    const goPage = (url) => {
        history.push(url);
    }
    //引导图
    const [currentTip, setCurrentTip] = useState(0)
    const [showDialog, setShowDialog] = useState(false)
    const changeTip = () => {
        let anchorElement = document.getElementById('show-shadow');
        if (anchorElement && currentTip < 4) {
            anchorElement.scrollIntoView({ behavior: 'smooth' });
        }
        if (currentTip == 4) {
            let box1 = document.querySelector(".right-wrapper-contentbox");
            box1.scrollTop = 20
        }
        setCurrentTip(currentTip + 1)
        if (currentTip >= 5) {
            setShowDialog(false)
        }
    }
    useEffect(() => {
        if (!localStorage.getItem('IS_SECOND_USER')) {
            localStorage.setItem('IS_SECOND_USER', 1)
            setCurrentTip(1)
            setShowDialog(true)
        }
    }, [])
    const menulist = useSelector(state => {
        return state.getIn(['userCenter', 'menulist']).toJS()
    })
    const getProductListNew = () => {
        history.push(`/open/product/proManage/list`)
    }
    //是否展示进入btn
    const isShowBtn = (value) => {
        let isShow = false
        menulist.forEach(item => {
            if (item.menuname == value) {
                isShow = true
            }
        })
        return isShow
    }
    //产品详情
    const goProductDetail = (record) => {
        let isShow = false
        function isGo(menuS) {
            menuS.forEach(item => {
                if (item.menuname == '产品管理') {
                    isShow = true
                }
                if (item.childmenus) {
                    isGo(item.childmenus)
                }
            })
        }
        isGo(menulist)
        if (isShow) {
            let pathroute = 'details';
            if (record.status !== 1) {
                pathroute = 'edit';
            } else if (record.isOldProduct) {
                pathroute = 'detail';
            }
            // 保存当前产品，为后边继续开发取数据使用
            sessionStorage.setItem('productItem', JSON.stringify(record))
            history.push(`/open/product/proManage/${pathroute}/${record.productId}`);
        } else {
            Notification({
                description: '无权限！',
            });
        }
    }
    //消息类型
    const getMessageType = (text) => {
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
    //是否跳转
    const goAuPage = (name, url) => {
        let isShow = false
        function isGo(menuS) {
            menuS.forEach(item => {
                if (item.menuname == name) {
                    isShow = true
                }
                if (item.childmenus) {
                    isGo(item.childmenus)
                }
            })
        }
        isGo(menulist)
        if (isShow) {
            history.push(url);
        } else {
            Notification({
                description: '无权限！',
            });
        }
    }
    //未开发
    const [showTip,setShowTip]=useState(false)
    return (
        <div className='over-view'>
            {
                showDialog && <div className='Guide-the-figure-dia'></div>
            }
            <div className='comm-shadowbox over-view-banner'>
                <Carousel autoplay>
                    {
                        bannerArr.length ? (bannerArr.map((item, index) => {
                            return <div className='imgdiv' key={index}>
                                <img src={item.imageUrl} alt='' />
                            </div>
                        })) : (<div className='imgdiv' >
                            <img src={banner} alt='' />
                        </div>)
                    }
                </Carousel>
            </div>
            <div className='over-view-content'>
                <div className='over-view-content-left'>
                    <div className='over-view-boxshadow over-view-statistical comm-shadowbox' id={1 == currentTip ? 'show-shadow' : ''}>
                        <div>
                            <div className='over-view-statistical-label'>接入产品数</div>
                            <div className='over-view-statistical-number'>{productCount.total}</div>
                        </div>
                        <div>
                            <div className='over-view-statistical-label'>开发中产品数</div>
                            <div className='over-view-statistical-number'>{productCount.devTotal}</div>
                        </div>
                        <div>
                            <div className='over-view-statistical-label'>在线设备数</div>
                            <div className='over-view-statistical-number'>{productCount.online}</div>
                        </div>
                        <div>
                            <div className='over-view-statistical-label'>故障设备数</div>
                            <div className=' over-view-statistical-number_err'>{productCount.fault}</div>
                        </div>
                        <div className='Guide-the-figure-content'>
                            <div className='tip' >
                                <span>总览数据</span>
                                <div>快速查看创建的产品及设备，点击数字查看相关信息</div>
                            </div>
                            <Button onClick={changeTip}>下一步</Button>
                        </div>
                    </div>

                    <div className='over-view-boxshadow over-view-productmn comm-shadowbox' id={2 === currentTip ? 'show-shadow' : ''}>
                        <div className='over-view-productmn-top'>
                            <div className='over-view-productmn-header'>
                                <div>产品管理</div>
                                {isShowBtn('产品') && <a onClick={() => { goPage('/open/product/proManage/list') }}>进入</a>}
                            </div>
                            <div className='over-view-productmn-content'>
                                {
                                    produList.length ? (produList.map((item, index) => {
                                        return (<div className='over-view-productmn-content-item' key={index} onClick={() => { goProductDetail(item) }}>
                                            <div className='over-view-productmn-content-img center-layout-wrap'><img src={item.productIcon} alt='' /></div>
                                            <div className='over-view-productmn-content-content'>
                                                <div>{item.productName}</div>
                                                <div>{productStatuFilter(item.status)}</div>
                                                <div>更新时间{moment(item.modifyTime).format('YYYY-MM-DD')}</div>
                                            </div>
                                        </div>)
                                    })) : <div className='over-no-data'><img src={noData} /> <div>暂无产品</div></div>

                                }
                            </div>
                        </div>

                        <div className='over-view-productmn-footer hover-commons-unite'>
                            <div onClick={() => { goAuPage('设备注册', '/open/product/devRegist') }}>
                                <img src={projectmn1} />
                                <div  >设备注册</div>
                            </div>
                            <div onClick={() => { goAuPage('固件升级', '/open/product/otaUpdate/list') }}>
                                <img src={projectmn2} />
                                <div >固件升级</div>
                            </div>
                            <div onClick={() => { goAuPage('场景服务', '/open/product/ruleEngine') }}>
                                <img src={projectmn3} />
                                <div >场景服务</div>
                            </div>
                            <div onClick={() => { goAuPage('云端定时', '/open/product/cloudTimer') }}>
                                <img src={projectmn4} />
                                <div >云端定时</div>
                            </div>
                            <div onClick={() => { goAuPage('远程配置', '/open/product/remoteCofig') }}>
                                <img src={projectmn5} />
                                <div>远程配置</div>
                            </div>
                        </div>
                        <div className='Guide-the-figure-content'>
                            <div className='tip' >
                                <span>产品管理</span>
                                <div>展示最新创建的产品及产品管理快捷入口，点击可查看详情</div>
                            </div>
                            <Button onClick={changeTip}>下一步</Button>
                        </div>
                    </div>
                    <div className='over-view-boxshadow over-view-device comm-shadowbox' id={3 === currentTip ? 'show-shadow' : ''}>
                        <div className='over-view-device-title'>我的设备</div>
                        <div className='over-view-device-content'>
                            <div className='over-view-device-content-item'>
                                <div >
                                    <div className='over-view-device-content-item-label'
                                        onClick={() => { goAuPage('设备管理', '/open/device/devManage/list') }}>
                                        设备管理
                                        <RightOutlined />
                                    </div>
                                    <div></div>
                                </div>
                                <div>
                                    <div>当前异常数</div>
                                    <div>{devOneList.exception}</div>
                                </div>
                                <div>
                                    <div>累计设备总数</div>
                                    <div>{devOneList.total}</div>
                                </div>
                                <div>
                                    <div>累计入网总数</div>
                                    <div>{devOneList.totalActive}</div>
                                </div>
                                <div>
                                    <div>今日入网总数</div>
                                    <div>{devOneList.todayActive}</div>
                                </div>
                            </div>
                            <div className='over-view-device-content-item'>
                                <div >
                                    <div className='over-view-device-content-item-label' onClick={() => { goAuPage('设备消息', '/open/device/devMsg') }} >
                                        设备消息
                                        <RightOutlined />
                                    </div>
                                    <div></div>
                                </div>
                                <div>
                                    <div>待处理告警</div>
                                    <div>{devThreeList.pending}</div>
                                </div>
                                <div>
                                    <div>已处理告警</div>
                                    <div>{devThreeList.processed}</div>
                                </div>
                                <div>
                                    <div>已发送告警</div>
                                    <div>{devThreeList.send}</div>
                                </div>
                                <div>
                                    <div>最近告警时间</div>
                                    <div>{devThreeList.lastWarnTime}</div>
                                </div>
                            </div>
                        </div>
                        <div className='Guide-the-figure-content-top'>
                            <div className='tip' >
                                <span>设备管理</span>
                                <div>预览设备全部数据，点击设备管理、设备密钥、设备告警,可快速查看设备信息</div>
                            </div>
                            <Button onClick={changeTip}>下一步</Button>
                        </div>
                    </div>
                    <div className='over-view-boxshadow over-view-productmn comm-shadowbox' id={4 === currentTip ? 'show-shadow' : ''} >
                        <div className='over-view-productmn-top'>
                            <div className='over-view-productmn-header'>
                                <div>APP开发</div>
                                {isShowBtn('APP') && <a onClick={goApp}>进入</a>}
                            </div>
                            <div className='over-view-productmn-content' style={{ height: '80px' }}>
                                {
                                    appList.length ? (appList.map((item, index) => {
                                        return (<div className='over-view-productmn-content-item over-view-productmn-content-two'
                                            key={index} onClick={() => { goAuPage('APP', `/open/app/details/${item.appId}`) }}>
                                            <div className='over-view-productmn-content-img center-layout-wrap'><img src={item.appIconLow} /></div>
                                            <div className='over-view-productmn-content-content'>
                                                <div>{item.appName}</div>
                                                <div className='over-view-productmn-content-content-time'>更新时间{moment(item.updateTime).format('YYYY-MM-DD')}</div>
                                            </div>
                                        </div>)
                                    })) : <div className='over-no-data'><img src={noData} /> <div>暂无App</div></div>

                                }
                            </div>
                        </div>
                        <div className='Guide-the-figure-content-top'>
                            <div className='tip' >
                                <span>App管理</span>
                                <div>展示最新开发应用，点击可查看详情</div>
                            </div>
                            <Button onClick={changeTip}>下一步</Button>
                        </div>
                    </div>
                </div>
                <div className='over-view-content-right'>
                    <div className='over-view-boxshadow over-view-unified-wrap comm-shadowbox' id={5 === currentTip ? 'show-shadow' : ''}>
                        <div>
                            <div>快捷入口</div>
                        </div>
                        <div className='over-view-quick-entry'>
                            <div className='center-layout-wrap' onClick={openNewProduct}>
                                <div >
                                    <img src={quick1} alt='' />
                                    <div>创建产品</div>
                                </div>
                            </div>
                            <div className='center-layout-wrap' onClick={() => { goAuPage('产品管理', '/open/product/proManage/list') }}>
                                <div>
                                    <img src={quick2} alt='' />
                                    <div>控制台</div>
                                </div>
                            </div>
                        </div>
                        <div className='Guide-the-figure-content'>
                            <div className='tip' >
                                <span>快捷入口</span>
                                <div>您可以点击这里快速创建产品或进入控制台</div>
                            </div>
                            <Button onClick={changeTip}>完成</Button>
                        </div>
                    </div>
                    <div className='over-view-boxshadow over-view-unified-wrap comm-shadowbox' >
                        <div>
                            <div>消息中心</div>
                            <a onClick={() => { goPage('/messageCenter/list') }}>更多</a>
                        </div>
                        <div className='over-view-message hover-commons-unite'>
                            {
                                messageList.length ? (messageList.map((item, index) => {
                                    return (<div className='over-view-message-item' onClick={() => { goMessageDetail(item.noticeId) }} key={index}>
                                        【{getMessageType(item.noticeType)} 】{item.noticeTitle}</div>)
                                })) : <div className='over-no-data'><img src={noData} alt='' /> <div>暂无消息</div></div>

                            }
                        </div>
                    </div>
                    <div className='over-view-boxshadow over-view-unified-wrap comm-shadowbox' >
                        <div>
                            <div>新建产品</div>
                        </div>
                        <div className='over-view-new-product'>
                            <div className='over-view-new-product-img'>
                                <img src={newproduct1} alt='' />
                                <img src={processimg} alt='' />
                                <img src={newproduct2} alt='' />
                                <img src={processimg} alt='' />
                                <img src={newproduct3} alt='' />
                                <img src={processimg} alt='' />
                                <img src={newproduct4} alt='' />
                                <img src={processimg} alt='' />
                                <img src={newproduct5} alt='' />
                            </div>
                            <div className='over-view-new-product-text'>
                                <div>1.定义功能</div>
                                <div>2.确定面板</div>
                                <div>3.开发硬件</div>
                                <div>4.配置服务</div>
                                <div>5.调试验证</div>
                            </div>
                        </div>
                    </div>
                    <div className='over-view-boxshadow over-view-unified-wrap comm-shadowbox' >
                        <div>
                            <div>数据服务</div>
                        </div>
                        <div className='over-view-data-service'>
                            <div className='center-layout-wrap'>
                                <div onClick={() => { goAuPage('设备分析', '/open/serve/device') }}>
                                    <img src={dataservice1} alt='' />
                                    <div >设备分析</div>
                                </div>
                            </div>
                            <div className='center-layout-wrap'>
                                <div onClick={() => { goAuPage('用户分析', '/open/serve/user') }}>
                                    <img src={dataservice2} alt='' />
                                    <div >用户分析</div>
                                </div>
                            </div>
                            <div className='center-layout-wrap'>
                                <div onClick={() => { goAuPage('数据订阅', '/open/serve/dataSub') }}>
                                    <img src={dataservice3} alt='' />
                                    <div>数据订阅</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='over-view-boxshadow over-view-unified-wrap comm-shadowbox' >
                        <div>
                            <div>帮助</div>
                        </div>
                        <div className='over-view-help hover-commons-unite'>
                            <div onClick={() => { store.dispatch(showCustomerService(true)); }}>
                                <img src={help1} alt='' />
                                <div>客服</div>
                            </div>
                            <div onClick={goOrder}>
                                <img src={help2} alt='' />
                                <div>工单</div>
                            </div>
                            <div onClick={() => { window.open('https://cms.clife.cn/clifeIotDoc/') }}>
                                <img src={help3} alt='' />
                                <div>帮助文档</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                newProductModal &&
                <AddProductModal
                    visible={newProductModal}
                    getProductListNew={getProductListNew}
                    cancelHandle={closeNewProduct}>
                </AddProductModal>
            }
            {/* 待开发功能 */}
            {
                showTip && <Modal title="温馨提示" width='370px' visible={showTip} footer={null} onCancel={() => { setShowTip(false) }}>
                    <div className='down-office-modal'>
                        <div>此功能正在升级维护中，敬请期待~</div>
                    </div>
                </Modal>
            }
        </div>
    )
}
