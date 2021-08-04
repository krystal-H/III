import React, { useState, useEffect,useMemo  } from 'react'
import PageTitle from '../../../components/page-title/PageTitle';
import './index.scss'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import DevInfo from './info'
import DevTag from './devTag'
import DevShadow from './devShadow'
import DevSet from './onlineSet'
import { getUrlParam } from '../../../util/util';
export default function DeviceInfo({ match,history }) {
    const stepS = useMemo(() => {
        let step = getUrlParam('step') || '1'
        return step
    }, []);

    const tabCallback = value => {
        history.push(match.url + '?' + `step=${value}`);
    }
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
            <Tabs defaultActiveKey={stepS} onChange={tabCallback}>
                <TabPane key={'1'} tab={'基本信息'}>
                    <DevInfo />
                </TabPane>
                <TabPane key={'2'} tab={'设备标签'}>
                    <DevTag />
                </TabPane>
                <TabPane key={'3'} tab={'设备影子'}>
                    <DevShadow />
                </TabPane>
                <TabPane key={'4'} tab={'远程配置'}>
                    <DevSet />
                </TabPane>
            </Tabs>
        </div>
    </div>)
}