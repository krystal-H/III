import DevInfo from './info'
import DevTag from './devTag'
import DevShadow from './devShadow'
import DevSet from './onlineSet'
import DevGateway from './gateWay'
import DataDownload from './dataDownload'
import { getUrlParam } from '../../../util/util';
import React, { useState, useEffect, useMemo } from 'react'
import { post, Paths } from '../../../api';
import PageTitle from '../../../components/page-title/PageTitle';
import { useHistory } from 'react-router-dom';
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
    const [baseInfo, setBaseInfo] = useState({})
    useEffect(() => {
        let parmas = { "infoType": "1", "field": devceId, "pageIndex": 1, "pageRows": 1 }
        post(Paths.getDeviceList, parmas).then((res) => {
            setBaseInfo(res.data.list[0])
        });
    }, [devceId])
    return (<div id='device-detail'>
        <PageTitle backTitle='设备详情' backHandle={() => { history.push('/open/device/devManage/list') }}>
            <div className='device-top'>
                <div className='device-top-item'>
                    <label className='device-label'>设备ID：</label><span className='device-text'>{baseInfo.deviceUniqueId}</span>
                    <span className='device-status'>{baseInfo.onlineStatus == 1 ? '在线' : '离线'}</span>
                </div>
                <div className='device-top-item'><label className='device-label'>物理地址：</label><span className='device-text'></span>{baseInfo.deviceMac}</div>
                <div className='device-top-item'><label className='device-label'>产品名称：</label><span className='device-text'>{baseInfo.productName}</span></div>
                <div className='device-top-item'><label className='device-label'>所属分类：</label><span className='device-text'>{baseInfo.productType}</span></div>
            </div>
        </PageTitle>
        <div className='comm-shadowbox common-tab device-content'>
            <Tabs defaultActiveKey={stepS} onChange={tabCallback}>
                <TabPane key={'1'} tab={'基本信息'}>
                    <DevInfo devceId={baseInfo.deviceId} />
                </TabPane>
                <TabPane key={'2'} tab={'设备标签'}>
                    <DevTag devceId={baseInfo.deviceId} />
                </TabPane>
                <TabPane key={'3'} tab={'设备影子'}>
                    <DevShadow devceId={baseInfo.deviceId} baseInfo={baseInfo} />
                </TabPane>
                <TabPane key={'6'} tab={'数据下载'}>
                    <DataDownload devceId={baseInfo.deviceId} baseInfo={baseInfo}/>
                </TabPane>
                <TabPane key={'4'} tab={'远程配置'}>
                    <DevSet devceId={baseInfo.deviceId} baseInfo={baseInfo} />
                </TabPane>
                {
                    baseInfo.productClass === 1 && <TabPane key={'5'} tab={'子设备列表'}>
                        <DevGateway deviceId={baseInfo.deviceId} baseInfo={baseInfo} />
                    </TabPane>
                }
            </Tabs>
        </div>
    </div>)
}