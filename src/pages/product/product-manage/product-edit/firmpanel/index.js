import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from 'antd';
import GrayDebugg from './grayDebugg'
import ChangeModal from './changeModal'
import './index.scss'
function confirmModel({ nextStep }, ref) {
    const [defaultTab, setDefaultTab] = useState('1')
    //灰色测试
    const [isGrayModalVisible, setIsGrayModalVisible] = useState(false);
    const CancelDebugg = () => {
        setIsGrayModalVisible(false)
    }
    const closeDebugg = () => {
        setIsGrayModalVisible(false)
    }
    const openDebugg = () => {
        setIsGrayModalVisible(true)
    }

    //更改面板
    const [isChangeModalVisible, setIsChangeModalVisible] = useState(true);
    const CancelChange = () => {
        setDefaultTab('1')
        setIsChangeModalVisible(false)
    }
    const openChangeTab=(val)=>{
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
    useImperativeHandle(ref, () => ({
        onFinish: subNextConFirm
    }));
    return <div className='confirm-pannel'>
        <div className='confirm-pannel-title'>
            <div>已选面板：</div>
            <div>标准面板</div>
        </div>
        <div className='confirm-pannel-content'>
            <div></div>
            <div>
                <div className='confirm-pannel-content-left'>
                    {/* {
                        pathname.indexOf('edit') > -1 && <Button type="primary" onClick={openDebugg}>灰度调试</Button>
                    } */}

                    <Button type="primary" ghost onClick={openChange}>更换面板</Button>
                </div>
                <div className='confirm-pannel-content-right'>
                    <div>请使用“数联智能”App，扫描以下二维码，体验此面板。</div>
                    <div></div>
                    <div>
                        还没安装App？
                        <a>下载"数联智能"App</a>
                    </div>
                </div>
            </div>
            <div>
                <div className='confirm-pannel-content-title'>面板创建快捷入口</div>
                <div className='confirm-pannel-content-item'>
                    <div>标准面板</div>
                    <div>clife推荐的快速控制面板，既拿既用，一键开发，快速支持硬件的智能化，适用于快速开发方案。</div>
                    <Button type="primary" ghost onClick={()=>{openChangeTab('1')}}>
                        进入
                    </Button>
                </div>
                <div className='confirm-pannel-content-item'>
                    <div>自由配置面板</div>
                    <div>直接拖拽可视化功能组件，所见即所得，DIY 出具有您的品牌风格的面板，适用于自定义开发方案。</div>
                    <Button type="primary" ghost>
                        进入
                    </Button>
                </div>
                <div className='confirm-pannel-content-item'>
                    <div>自定义开发上传</div>
                    <div>通过clife提供的一系列开发工具包，便捷的开发调试出最具品牌风格的面板，适用于自定义开发方案。</div>
                    <Button type="primary" ghost onClick={()=>{openChangeTab('3')}}>
                        进入
                    </Button>
                </div>
                <div className='confirm-pannel-content-other'>均不满足，需要委托定制？直接联系Clife。<a>提交工单</a></div>
            </div>
        </div>
        {
            isGrayModalVisible && <GrayDebugg isGrayModalVisible={isGrayModalVisible} closeDebugg={closeDebugg} CancelDebugg={CancelDebugg}></GrayDebugg>
        }
        {
            isChangeModalVisible && <ChangeModal isChangeModalVisible={isChangeModalVisible} defaultTab={defaultTab} closeChange={closeChange} CancelChange={CancelChange}></ChangeModal>
        }
    </div>
}

export default confirmModel = forwardRef(confirmModel)