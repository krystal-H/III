import React, { useState, useEffect, useRef } from 'react'
import { Descriptions, Button, Icon, Tabs } from 'antd';
import { post, Paths, get } from '../../../../../api';
import FileModel from './importFile'
import DeviceList from './list'
import Manage from './manage'
import './index.scss'
const { TabPane } = Tabs;
export default function Device({ baseInfo, projectId }) {
    const [activeKey, setactiveKey] = useState('1')
    const [fileVisible, setFileVisible] = useState(false) //导入文件
    let tabOne = useRef();
    let tabTwo = useRef();
    const changeKey = (val) => {
        setactiveKey(val)
    }
    //新增
    const openImport = () => {
        setFileVisible(true)
    }
    //
    const cancelFile = () => {
        setFileVisible(false)
    }
    //
    const closeFile = () => {
        tabOne.current.reFresh()
        tabTwo.current.reFresh()
        setFileVisible(false)
    }
    return (<div className='page-apilist project-device-wrap'>
        <div className='comm-shadowbox common-tab'>
            <div className='top-but'>
                <Button type="primary" onClick={openImport} >
                    导入设备
                </Button>
            </div>
            <Tabs onChange={(val) => changeKey(val)} activeKey={activeKey}>
                <TabPane tab="设备列表" key="1">
                    <DeviceList baseInfo={baseInfo} projectId={projectId} ref={tabOne} />
                </TabPane>
                <TabPane tab="批次管理" key="2">
                    <Manage baseInfo={baseInfo} projectId={projectId} ref={tabTwo} />
                </TabPane>
            </Tabs>
        </div>
        {
            fileVisible && <FileModel isModalVisible={fileVisible} colseMoadl={closeFile} cancelModel={cancelFile} projectId={projectId} />
        }
    </div>)
}