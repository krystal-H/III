import React, { useState } from 'react'
import PageTitle from '../../../components/page-title/PageTitle';
import './index.scss'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import DevInfo from './info'
export default function DeviceInfo() {
    return (<div id='device-detail'>
        <PageTitle backTitle='设备详情' >
            <div className='device-top'>
                <div className='device-top-item'>
                    <label className='device-label'>设备ID：</label><span className='device-text'>405EE1100371</span><span className='device-status'>离线</span>
                </div>
                <div className='device-top-item'><label className='device-label'>物理地址ID：</label><span className='device-text'>405EE1100371</span></div>
                <div className='device-top-item'><label className='device-label'>产品名称：</label><span className='device-text'>405EE1100371</span></div>
                <div className='device-top-item'><label className='device-label'>所属分类：</label><span className='device-text'>405EE1100371</span></div>
            </div>
        </PageTitle>
        <div className='comm-shadowbox device-content '>
            <Tabs defaultActiveKey='1'>
                <TabPane key={'1'} tab={'基本信息'}>
                    <DevInfo />
                </TabPane>
                <TabPane key={'2'} tab={'设备标签'}>
                    <DevInfo />
                </TabPane>
                <TabPane key={'3'} tab={'设备影子'}>
                    <DevInfo />
                </TabPane>
                <TabPane key={'4'} tab={'远程配置'}>
                    <DevInfo />
                </TabPane>
            </Tabs>
        </div>
    </div>)
}