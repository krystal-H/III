import DevInfo from './info'
import DevTag from './devTag'
import DevShadow from './devShadow'
import DevSet from './onlineSet'
import { getUrlParam } from '../../../util/util';
import React, { useState, useEffect, useMemo } from 'react'
import PageTitle from '../../../components/page-title/PageTitle';
import {  useHistory } from 'react-router-dom';
import './index.scss'
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default function DeviceInfo({ match }) {
    let history = useHistory();
    const stepS = useMemo(() => {
        let step = getUrlParam('step') || '1'
        return step
    }, []);
    const devceId = match.params.id
    const tabCallback = value => {
        history.push(match.url + '?' + `step=${value}`);
    }
    let baseInfo = {}
    if (sessionStorage.DEVICE_DETAIL_BASE) {
        baseInfo = JSON.parse(sessionStorage.DEVICE_DETAIL_BASE)
    }
    return (<div id='device-detail'>
        <PageTitle backTitle='设备详情' backHandle={() => { history.push('/open/device/devManage/list') }}>
            <div className='device-top'>
                <div className='device-top-item'>
                    <label className='device-label'>设备ID：</label><span className='device-text'>{baseInfo.deviceId}</span>
                    <span className='device-status'>{baseInfo.onlineStatus == 1 ? '在线' : '离线'}</span>
                </div>
                <div className='device-top-item'><label className='device-label'>物理地址ID：</label><span className='device-text'></span>{baseInfo.deviceMac}</div>
                <div className='device-top-item'><label className='device-label'>产品名称：</label><span className='device-text'>{baseInfo.productName}</span></div>
                <div className='device-top-item'><label className='device-label'>所属分类：</label><span className='device-text'>{baseInfo.productType}</span></div>
            </div>
        </PageTitle>
        <div className='comm-shadowbox common-tab device-content'>
            <Tabs defaultActiveKey={stepS} onChange={tabCallback}>
                <TabPane key={'1'} tab={'基本信息'}>
                    <DevInfo devceId={devceId} />
                </TabPane>
                <TabPane key={'2'} tab={'设备标签'}>
                    <DevTag devceId={devceId} />
                </TabPane>
                <TabPane key={'3'} tab={'设备影子'}>
                    <DevShadow devceId={devceId} />
                </TabPane>
                <TabPane key={'4'} tab={'远程配置'}>
                    <DevSet devceId={devceId} />
                </TabPane>
            </Tabs>
        </div>
    </div>)
}