import React, { useState, useEffect } from 'react'
import './index.scss'
import DescWrapper from '../../../../components/desc-wrapper/DescWrapper';
import { post, Paths } from '../../../../api';
import { Tabs, Radio } from 'antd';

import TableCom from './tableCom'
import CodeMirrorView from "../../../../components/CodeMirrorView";
const { TabPane } = Tabs;
//处理数据
function delaData(data) {
    let newData = []
    data.forEach(item => {
        if (!item.funcParamList || !item.funcParamList.length) return
        item.funcParamList.forEach(item2 => {
            let newItem = JSON.parse(JSON.stringify(item))
            newData.push({ ...newItem, ...item2 })
        })
    })
    newData.forEach((item, index) => {
        item.key = index
    })
    return newData
}
export default function DeviceShadow({ baseInfo, devceId }) {
    //帮助文档
    const downFile = () => {
        window.open('https://cms.clife.cn/clifeIotDoc/')
    }
    // const getJsonView = () => {
    //     const { result = {} } = this.state;
    //     const code = JSON.stringify(result);
    //     return <CodeMirrorView code={code} />;
    // };

    const [dataSource, setDataSource] = useState([])
    const [jsonData, setJsonData] = useState('')
    const [currentTab, setCurrentTab] = useState('a')
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        if (devceId) {
            getDetail()
        }
    }, [devceId])
    const getDetail = (loading = true) => {
        post(Paths.deviceShadow, { 'deviceUniqueId': baseInfo.deviceUniqueId }, { loading }).then((res) => {

            // if (res.data.tslType == 'properties') {
            //     setCurrentTab('a')
            // } else if (res.data.tslType == 'events') {
            //     setCurrentTab('b')
            // } else if (res.data.tslType == 'services') {
            //     setCurrentTab('c')
            // }
            console.log(res.data)
            setDataSource(res.data)
            let arr=['properties','events','services']
            let obj={}
            for(let key of arr){
                let data=res.data.find(item=>{
                    return key === item.tslType
                })
                if(data){
                    obj[key]=data.jsonString || {}
                }
            }
            // let jsonData = res.data.jsonString || {}
            setJsonData(JSON.stringify(obj))
        });
    }
    //筛选
    const radioChange = (value) => {
        value = value.target.value
        let index
        if (value === 'a') {
            index = 'properties'
        } else if (value === 'b') {
            index = 'events'
        } else if (value === 'c') {
            index = 'services'
        }
        let data = dataSource.find(item => {
            return item.tslType == index
        })
        if(data){
            data=delaData(data.list)
        }
        setTableData(data || [])
        setCurrentTab(value)

    }
    return (<div id='device-shadow'>
        <DescWrapper
            style={{ marginBottom: 8, width: '100%', display: 'flex' }}
            desc={['设备影子是设备最新状态在平台的缓存信息，您可以在平台实时查询设备的运行和状态信息，也可以通过API获取设备状态信息。详细说明可参考',
                <a onClick={downFile}>帮助文档</a>]}>
        </DescWrapper>
        <Tabs defaultActiveKey='1' className='shadow-tab'>
            <TabPane key={'1'} tab={'表单模式'}>
                <div >
                    <Radio.Group value={currentTab} size="middle" onChange={radioChange} style={{ margin: '6px 0  22px 0' }}>
                        <Radio.Button value="a" >属性</Radio.Button>
                        <Radio.Button value="b" >事件</Radio.Button>
                        <Radio.Button value="c" >服务</Radio.Button>
                    </Radio.Group>
                    <TableCom dataSource={tableData} deviceId={devceId} baseInfo={baseInfo} />
                </div>
            </TabPane>
            <TabPane key={'2'} tab={'Json模式'}>
                {/* <DevTag /> */}
                <div>
                    <CodeMirrorView code={jsonData} />
                </div>
            </TabPane>
        </Tabs>
    </div>)
}