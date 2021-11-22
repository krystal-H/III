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
import { DateTool, addKeyToTableData } from '../../../../util/util'
import './project-detail.scss'

const { TabPane } = Tabs

export default function DeviceInfo({ match }) {
    const [curStep, setCurStep] = useState('1')
    const [detailObj, setDetailObj] = useState(JSON.parse(sessionStorage.getItem('d_data')))
    let history = useHistory();
    const stepS = useMemo(() => {
        let step = getUrlParam('step') || '1'
        return step
    }, [])
    const projectId = match.params.id
    const tabCallback = value => {
        setCurStep(value)
        history.push(`${match.url}?step=${value}`)
    }
    const [baseInfo, setBaseInfo] = useState({})
    useEffect(() => {
        reFreshData()
    }, [])
    const reFreshData = () => {
        post(Paths.projectInfoOverview, { projectId }).then((res) => {
            setBaseInfo(res.data)
        });
    }
    // 为了判断openAPI  tab样式
    useEffect(() => {
        if (stepS === '2') setCurStep('2')
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (<div className='project-detail-page'>
        <PageTitle backTitle={detailObj.projectName} backHandle={() => { history.push('/open/project/projectManage/list') }}>
            <div className='device-top'>
                <div className='device-top-item'>
                    <label className='device-label'>项目ID：</label>
                    <span className='device-text'></span>{detailObj.projectId}</div>
                <div className='device-top-item'>
                    <label className='device-label'>创建时间：</label>
                    <span className='device-text'>{detailObj.createTime && DateTool.utcToDev(detailObj.createTime)}</span>
                </div>
                <div className='device-top-item'>
                    <label className='device-label'>更新时间：</label>
                    <span className='device-text'>{detailObj.updateTime && DateTool.utcToDev(detailObj.updateTime)}</span>
                </div>
            </div>
        </PageTitle>
        <div className={`comm-shadowbox common-tab device-content ${curStep === '2' ? 'api-tab-style' : ''} `}>
            <Tabs defaultActiveKey={stepS} onChange={tabCallback}>
                <TabPane key={'1'} tab={'概述'}>
                    <Overview baseInfo={baseInfo} projectId={projectId} />
                </TabPane>
                <TabPane key={'2'} tab={'openAPI'}>
                    <OpenAPI projectId={projectId} />
                </TabPane>
                <TabPane key={'3'} tab={'分组'}>
                    <Grouping projectId={projectId} userId={baseInfo.accountId}  />
                </TabPane>
                <TabPane key={'4'} tab={'设备'}>
                    <Device baseInfo={baseInfo} projectId={projectId} />
                </TabPane>
            </Tabs>
        </div>
    </div>)
}