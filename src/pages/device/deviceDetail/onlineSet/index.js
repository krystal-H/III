import React, { useState } from 'react'
import { Select, Steps, Button, Input, Space, Table } from 'antd';
import './index.scss'
import stepImg from '../../../../assets/images/product-regist.png';
import DescWrapper from '../../../../components/desc-wrapper/DescWrapper';
const { Step } = Steps;
export default function DeviceSet() {
    const downFile = () => {

    }
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
            title: '任务ID',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '任务名称',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '任务说明',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '任务状态',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '执行时间',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    return (<div id='device-online-set'>
        <div className='comm-shadowbox device-setp-ttip'>
            <div className='step-title'>
                <img src={stepImg} />
                <span>远程配置步骤</span>
            </div>
            <DescWrapper
                desc={['设备影子是设备最新状态在平台的缓存信息，您可以在平台实时查询设备的运行和状态信息，也可以通过API获取设备状态信息。详细说明可参考',
                    <a onClick={downFile}>帮助文档</a>]}>
            </DescWrapper>
            <Steps current={-1} initial={0}>
                <Step title="创建远程配置任务" description="创建远程配置任务，填写任务的目的或备注信息。" />
                <Step title="添加配置数据" description="添加要更新的产品配置数据字段和更新的数值。" />
                <Step title="执行任务" description='提交执行远程配置任务，设备更新结果实时可见。' />
            </Steps>
        </div>
        <div className='device-online-btn'>
            <Button type="primary">创建任务</Button>
        </div>
        <Table dataSource={dataSource} columns={columns} />;
    </div>)
}