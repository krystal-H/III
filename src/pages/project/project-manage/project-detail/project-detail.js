import Overview from './overview'
import Grouping from './grouping'
import Device from './device'
import OpenAPI from './openAPI'
import { getUrlParam } from '../../../../util/util';
import React, { useState, useEffect, useMemo } from 'react'
import { post, Paths, get } from '../../../../api';
import PageTitle from '../../../../components/page-title/PageTitle'
import { useHistory } from 'react-router-dom'
import { Tabs } from 'antd'
import './project-detail.scss'

const { TabPane } = Tabs

export default function DeviceInfo({ match }) {
    let history = useHistory();
    const stepS = useMemo(() => {
        let step = getUrlParam('step') || '1'
        return step
    }, [])
    const devceId = match.params.id
    const tabCallback = value => {
        history.push(`${match.url}?step=${value}`)
    }
    const [baseInfo, setBaseInfo] = useState({})
    useEffect(() => {
        // let parmas = { "infoType": "1", "field": devceId, "pageIndex": 1,"pageRows": 1 }
        // post(Paths.getDeviceList, parmas).then((res) => {
        //     setBaseInfo(res.data.list[0])
        // });
    }, [devceId])
    return (<div id='device-detail'>
        <PageTitle backTitle='XXX' backHandle={() => { history.push('/open/project/projectManage/list') }}>
            <div className='device-top'>
                <div className='device-top-item'><label className='device-label'>项目ID：</label><span className='device-text'></span>123123132131</div>
                <div className='device-top-item'><label className='device-label'>创建时间：</label><span className='device-text'>{baseInfo.productName}</span></div>
                <div className='device-top-item'><label className='device-label'>更新时间：</label><span className='device-text'>{baseInfo.productType}</span></div>
            </div>
        </PageTitle>
        <div className='comm-shadowbox common-tab device-content'>
            <Tabs defaultActiveKey={stepS} onChange={tabCallback}>
                <TabPane key={'1'} tab={'概述'}>
                    <Overview devceId={baseInfo.deviceId} />
                </TabPane>
                <TabPane key={'2'} tab={'openAPI'}>
                    <OpenAPI devceId={baseInfo.deviceId} />
                </TabPane>
                <TabPane key={'3'} tab={'分组'}>
                    <Grouping devceId={baseInfo.deviceId} baseInfo={baseInfo} />
                </TabPane>
                <TabPane key={'4'} tab={'设备'}>
                    <Device devceId={baseInfo.deviceId} baseInfo={baseInfo} />
                </TabPane>
            </Tabs>
        </div>
    </div>)
}