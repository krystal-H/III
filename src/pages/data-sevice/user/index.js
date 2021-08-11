import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import PageTitle from '../../../components/page-title/PageTitle';
import { post, Paths, get } from '../../../api';
import { Radio, DatePicker, Select, Table, Tabs } from 'antd';
import CountNum from '../../../components/CountNum/index';
import '../device/index.scss'
import './index.scss'
const options = [
    { label: '昨天', value: 'Apple' },
    { label: '近7天', value: 'Pear' },
    { label: '近30天', value: 'Orange' },
];
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const originCount = [
    { label: '新增设备数', count: 0 },
    { label: '入网设备数', count: 0 },
    { label: '移动设备数', count: 0 },
    { label: '异常设备数', count: 0 },
    { label: '设备累计总数', count: 0 }]
const columns = [
    {
        title: '日期',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '物理地址',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '入网设备数',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '移动设备数',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '异常设备数',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '设备累计总数',
        dataIndex: 'address',
        key: 'address',
    },
];

export default function Device() {
    const [currentTime, setCurrentTime] = useState('Apple')
    const [countData, setCountData] = useState(originCount)
    const [tableData, setTableData] = useState([])
    const onChange3 = e => {
        setCurrentTime(e.target.value)
    };
    useEffect(() => {
    }, [])
    const callback = (key) => {

    }
    return (
        <div id='device-analysis'>
            <PageTitle title='用户分析'>
                <div className='top-select'>
                    <Select defaultValue="lucy" style={{ width: 200 }} allowClear>
                        <Select.Option value="lucy">Lucy</Select.Option>
                    </Select>
                </div>
            </PageTitle>
            <div className='comm-shadowbox filter-wrap'>
                <Radio.Group
                    options={options}
                    onChange={onChange3}
                    value={currentTime}
                    optionType="button"
                />

                <RangePicker />

            </div>
            <div className='comm-shadowbox main-echart'>
                <h3>设备趋势分析</h3>
                <CountNum data={countData} className='dadas' />
                <div className='user-analysis-main'>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="留存率" key="1">
                            <Table dataSource={tableData} columns={columns} />
                        </TabPane>
                        <TabPane tab="留存数" key="2">
                            <Table dataSource={tableData} columns={columns} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>

        </div>
    )
}
