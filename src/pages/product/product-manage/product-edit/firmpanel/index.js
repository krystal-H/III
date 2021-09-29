import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { Button, Modal } from 'antd';
import ChangeModal from './changeModal'
import { post, Paths, get } from '../../../../../api';
import demoAppOfficial from '../../../../../assets/images/demoAppOfficial.png';
import { useHistory } from 'react-router-dom';
import { cloneDeep } from "lodash";
import GrayDebugg from './grayDebugg'
import ActionModel from './actionModel'
import RelPanModel from './relPanel'
import { Notification } from '../../../../../components/Notification';
import defaultCumPan from '../../../../../assets/images/commonDefault/default-pannel.jpg';
import './index.scss'
function confirmModel({ nextStep }, ref) {
    let productId = 0
    if (sessionStorage.getItem('productItem')) {
        productId = JSON.parse(sessionStorage.getItem('productItem')).productId
    }
    let history = useHistory();
    useEffect(() => {
        getList()
    }, [])
    const [defaultTab, setDefaultTab] = useState('1')
    const [actionVis, setActionVis] = useState(false) //操作弹窗展示
    const [showTip,setShowTip]=useState(false)
    //获取最近发布的数据
    const [shoaLast, setShoaLast] = useState({})
    const getList = () => {
        let productId = 0
        if (sessionStorage.getItem('productItem')) {
            productId = JSON.parse(sessionStorage.getItem('productItem')).productId
        }
        post(Paths.panelList, { productId }).then((res) => {
            let data = res.data.list
            let lastEst = {}
            if (!data.length) return;
            lastEst = data[0]
            data.forEach(item => {
                if (item.verifyStatus == 1) {
                    lastEst = item
                    return
                }
            })
            data.forEach(item => {
                if (item.isLatest == 1) {
                    lastEst = item
                    return
                }
            })
            lastEst.status = getPanelStatus(lastEst)
            setShoaLast(lastEst)
        });
    }
    const [actionType, setActionType] = useState(0)
    const [actionData, setActionData] = useState({})
    //确定发布
    const relOkAc = () => {
        let params = {
            productId,
            projectId: actionData.projectId,
            status: 1,
            appId: 1
        }
        post(Paths.modelRel, params).then((res) => {
            Notification({
                type: 'success',
                description: '提交发布成功！'
            })
            setActionVis(false)
            getList()
        });
    }
    //确定下线
    const offOkLine = () => {
        let params = {
            productId,
            projectId: actionData.projectId,
        }
        post(Paths.panelOffLine, params).then((res) => {
            Notification({
                type: 'success',
                description: '下线成功！'
            })
            setActionVis(false)
            getList()
        });
    }
    //取消
    const closeAction = () => {
        setActionVis(false)
    }
    //删除
    const openDel = (data1, type) => {
        let data = cloneDeep(data1)
        if (type == 4) {
            data.projectName = data.templateName
        }
        setActionData(data)
        setActionType(type)
        setActionVis(true)
    }
    //操作判断
    const updateOkHandle = () => {
        if (actionType === 1) {
            relOkAc()
        } else if (actionType === 2) {
            delOkCancel()
        } else if (actionType === 3) {
            offOkLine()
        } else if (actionType === 4) {
            useModel()
        }
    }
    //灰色测试
    const [isGrayModalVisible, setIsGrayModalVisible] = useState(false);
    //取消灰度
    const CancelDebugg = () => {
        setIsGrayModalVisible(false)
    }
    //更新灰度
    const closeDebugg = () => {
        getList()
        Notification({
            type: 'success',
            description: '灰度调试成功！'
        })
        setIsGrayModalVisible(false)
    }
    //打开灰度
    const openDebugg = (data) => {
        setActionData(data)
        setIsGrayModalVisible(true)
    }
    //使用
    const useModel = () => {
        let params = {
            productId,
            filePath: actionData.filePath,
            projectType: 1,
            projectName: actionData.templateName,
            templateId: actionData.templateId,
            page1: actionData.page1,
            panelType: 1
        }
        post(Paths.cusSavePanel, params).then((res) => {
            getList()
            Notification({
                type: 'success',
                description: '提交使用成功！',
            });
            setActionVis(false)
        });
    }
    //发布
    const [relPanVis, setRelPanVis] = useState(false)
    //打开发布==============
    const openRel = (data) => {
        setActionData(data)
        setRelPanVis(true)
    }
    const CancelRel = () => {
        setRelPanVis(false)
    }
    const closeOkRel = () => {
        Notification({
            type: 'success',
            description: '发布成功！'
        })
        getList()
        setRelPanVis(false)
    }
    //更改面板
    const [isChangeModalVisible, setIsChangeModalVisible] = useState(false);
    const CancelChange = () => {
        setDefaultTab('1')
        setIsChangeModalVisible(false)
    }
    const openChangeTab = (val) => {
        setDefaultTab(val)
        setIsChangeModalVisible(true)
    }
    const closeChange = () => {
        setDefaultTab('1')
        setIsChangeModalVisible(false)
    }
    const openChange = () => {
        setDefaultTab('1')
        setIsChangeModalVisible(true)
    }
    const subNextConFirm = () => {
        nextStep()
    }
    const [showOffice, setShowOffice] = useState(false)
    //下载数联app
    const openOffice = () => {
        setShowOffice(true)
    }
    //取消下载数联app
    const handleCancel = () => {
        setShowOffice(false)
    }
    useImperativeHandle(ref, () => ({
        onFinish: subNextConFirm
    }));
    //回显标准面板按钮
    const getStandardBtn = (record, status) => {
        if (status == '模板') {
            return (<div >
                <Button onClick={() => { openDel(record, 4) }} type='primary'>使用</Button>
            </div>)
        }
        if (status == '草稿') {
            return (<div >
                <Button onClick={() => { openDebugg(record) }} type='primary'>灰度调试</Button>
            </div>)
        }
        if (status == '调试中') {
            return (<div >
                <Button onClick={() => { openDebugg(record) }} type='primary'>灰度调试</Button>
                <Button onClick={() => { openRel(record, 1) }} type='primary'>发布</Button>
            </div>)
        }
        if (status == '已发布') {
            return (<div >
                <Button onClick={() => { openDel(record, 3) }} type='primary'>下线</Button>
            </div>)
        }
        if (status == '已下线') {
            return (<div>
                <Button onClick={() => { openDebugg(record) }} type='primary'>灰度调试</Button>
            </div>)
        }
        return ''
    }
    //获取面板状态
    const getPanelStatus = (data) => {
        let { projectStatus, verifyStatus, htmlShow, isGray } = data
        if (projectStatus == 0 && verifyStatus == 0 && isGray == 0) {
            return '草稿'
        }
        if (projectStatus == 1 && isGray == 1) {
            return '调试中'
        }
        if (projectStatus == 1 && verifyStatus == 1 && isGray == 0 && htmlShow == 1) {
            return '已发布'
        }
        if (projectStatus == 1 && verifyStatus == 3 && isGray == 0 && htmlShow == 0) {
            return '审核中'
        }
        if (projectStatus == 1 && verifyStatus == 0 && isGray == 0 && htmlShow == 0) {
            return '已下线'
        }
        return ''
    }
    return <div className='confirm-pannel'>
        <div className='confirm-pannel-title'>
            <div>已选面板：</div>
            <div>{shoaLast.projectName || '自定义开发上传'}</div>
        </div>
        <div className='confirm-pannel-content'>
            <div className='pannel-cover-image'>
                <img src={shoaLast.page1 || defaultCumPan} alt='' />
                {
                   shoaLast.status && <div className='pannel-status'>{shoaLast.status}</div>
                }
                
            </div>
            <div>
                <div className='confirm-pannel-content-left'>
                    {
                        getStandardBtn(shoaLast, shoaLast.status)
                    }
                    <Button type="primary" ghost onClick={openChange}>更换面板</Button>
                </div>
                <div className='confirm-pannel-content-right'>
                    <div>请使用“数联智能”App，扫描以下二维码，体验此面板。</div>
                    <div className='model-panal-code'>
                        <img src={shoaLast.qrcode || demoAppOfficial} alt='' />
                    </div>
                    <div>
                        还没安装App？
                        <a onClick={openOffice}>下载"数联智能"App</a>
                    </div>
                </div>
            </div>
            <div>
                <div className='confirm-pannel-content-title'>面板创建快捷入口</div>
                <div className='confirm-pannel-content-item'>
                    <div>标准面板</div>
                    <div>clife推荐的快速控制面板，既拿既用，一键开发，快速支持硬件的智能化，适用于快速开发方案。</div>
                    <Button type="primary" ghost onClick={() => { openChangeTab('1') }}>
                        进入
                    </Button>
                </div>
                <div className='confirm-pannel-content-item'>
                    <div>自由配置面板</div>
                    <div>直接拖拽可视化功能组件，所见即所得，DIY 出具有您的品牌风格的面板，适用于自定义开发方案。</div>
                    <Button type="primary" ghost onClick={()=>{setShowTip(true)}}>
                        进入
                    </Button>
                </div>
                <div className='confirm-pannel-content-item'>
                    <div>自定义开发上传</div>
                    <div>通过clife提供的一系列开发工具包，便捷的开发调试出最具品牌风格的面板，适用于自定义开发方案。</div>
                    <Button type="primary" ghost onClick={() => { openChangeTab('3') }}>
                        进入
                    </Button>
                </div>
                <div className='confirm-pannel-content-other'>均不满足，需要委托定制？直接联系Clife。<a onClick={() => { history.push(`/open/repairOrder`) }}>提交工单</a></div>
            </div>
        </div>
        {
            isChangeModalVisible && <ChangeModal isChangeModalVisible={isChangeModalVisible} defaultTab={defaultTab} closeChange={closeChange} CancelChange={CancelChange}></ChangeModal>
        }
        {
            showOffice && <Modal title="安装“数联智能”App" width='370px' visible={showOffice} footer={null} onCancel={handleCancel}>
                <div className='down-office-modal'>
                    <img src={demoAppOfficial} />
                    <div>手机扫描二维码下载</div>
                </div>
            </Modal>
        }
        {
            isGrayModalVisible && <GrayDebugg actionObj={actionData} isGrayModalVisible={isGrayModalVisible} closeDebugg={closeDebugg} CancelDebugg={CancelDebugg}></GrayDebugg>
        }
        {
            actionVis && <ActionModel
                visible={actionVis}
                operate={actionType}
                actionObj={actionData}
                updateOkHandle={() => updateOkHandle()}
                updateCancelHandle={() => closeAction()} />
        }
        {/* 发布 */}
        {
            relPanVis && <RelPanModel actionObj={actionData} relPanVis={relPanVis} CancelRel={CancelRel} closeOkRel={closeOkRel} />
        }
        {/* 待开发功能 */}
        {
            showTip && <Modal title="温馨提示" width='370px' visible={showTip} footer={null} onCancel={()=>{setShowTip(false)}}>
                <div className='down-office-modal'>
                    <div>此功能正在升级维护中，敬请期待~</div>
                </div>
            </Modal>
        }
    </div>
}

export default confirmModel = forwardRef(confirmModel)