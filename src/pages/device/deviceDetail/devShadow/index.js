import React, { useState } from 'react'
import './index.scss'
import DescWrapper from '../../../../components/desc-wrapper/DescWrapper';
import { Tabs, Radio, Table } from 'antd';
const { TabPane } = Tabs;
export default function DeviceShadow() {
    //下载
    const downFile = () => {

    }
    const [dataSource, setDataSource] = useState([])

    const columns = [
        {
            title: '数据名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '数据标识',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '数据类型',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '单位',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '数据属性',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '最新数据',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    //筛选
    const radioChange = (value) => {

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
                    <Radio.Group defaultValue="a" size="middle" onChange={radioChange} style={{ margin: '6px 0  22px 0' }}>
                        <Radio.Button value="a">属性</Radio.Button>
                        <Radio.Button value="b">事件</Radio.Button>
                        <Radio.Button value="c">服务</Radio.Button>
                    </Radio.Group>
                    <Table dataSource={dataSource} columns={columns} />;
                </div>
            </TabPane>
            <TabPane key={'2'} tab={'Json模式'}>
                {/* <DevTag /> */}
            </TabPane>
        </Tabs>
    </div>)
}