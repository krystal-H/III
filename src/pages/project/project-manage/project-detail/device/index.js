import React, { useState, useEffect } from 'react'
import { Descriptions, Divider, Icon, Tabs } from 'antd';
import { post, Paths, get } from '../../../../../api';
import DeviceList from './list'
import Manage from './manage'
import './index.scss'
const { TabPane } = Tabs;
export default function Device({baseInfo, projectId }) {
    const [activeKey, setactiveKey] = useState('1')
    const changeKey = (val) => {
        setactiveKey(val)
    }
    return (<div className='page-apilist'>
        <div className='comm-shadowbox common-tab'>
            <Tabs onChange={(val) => changeKey(val)} activeKey={activeKey}>
                <TabPane tab="设备列表" key="1">
                    <DeviceList baseInfo={baseInfo} projectId={projectId}/>
                </TabPane>
                <TabPane tab="调试" key="2">
                    <Manage baseInfo={baseInfo} projectId={projectId}/>
                </TabPane>
            </Tabs>
        </div>
    </div>)
}