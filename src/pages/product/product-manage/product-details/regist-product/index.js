import React, { useState, useEffect } from 'react'
import { Select, Steps, Button, Input, Space, Table } from 'antd';
import PageTitle from '../../../../../components/page-title/PageTitle';
import stepImg from '../../../../../assets/images/product-regist.png';
import CountNum from '../../../../../components/CountNum/index';
import './index.scss'
import RegistModel from './modelFn'
const { Option } = Select;
const { Step } = Steps;
const { Search } = Input;
export default function DeviceRegist() {
    const [deviceNameS, setDeviceNameS] = useState([])
    const [productCount, SetproductCount] = useState({})
    const [dataSource, setDataSource] = useState([])
    const [countData, setCountData] = useState([{ label: '设备总数量', count: 0 }, { label: '已入网设备', count: 0 }, { label: '未入网设备', count: 0 }])
    const columns = [
        {
            title: '设备ID',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '物理地址',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '通信验证方式',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '归属产品名称',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '设备秘钥',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '入网状态',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '入网时间',
            dataIndex: 'address',
            key: 'address',
        }
    ];
    useEffect(() => { }, [])
    const downFile = () => {
        alert(10)
    }
    //搜索
    const onSearch = value => console.log(value);
    //注册
    const [modelVis, setModelVis] = useState(false)
    const openRegist = () => {
        setModelVis(true)
    }
    const cancelModel = () => {
        setModelVis(false)
    }
    const colseMoadl = () => {
        setModelVis(false)
    }
    return (
        <div id='product-device-regist'>
            <div className='comm-shadowbox setp-ttip'>
                <div className='step-title'>
                    <img src={stepImg} />
                    <span>注册设备步骤</span>
                </div>
                <Steps current={-1} initial={0}>
                    <Step title="选择不同校验机制" description="注册设备，产品发布前，需在配置服务步骤，确定安全通信安全机制。" />
                    <Step title="注册设备物理地址" description="Clife平台提供产品密钥验证、产品密钥&设备ID验证、设备ID&设备密钥验证多种安全通信机制。" />
                    <Step title="查看入网设备" description={<><span>Clife平台提供产品密钥验证、产品密钥&设备ID验证、设备ID&设备密钥验证多种安全通信机制。</span><a onClick={downFile}>下载密钥烧录工具</a></>} />
                </Steps>
            </div>
            <CountNum data={countData} />
            <div className='comm-shadowbox device-content'>
                <div className='content-top'>
                    <div className='content-top-left'>
                        <span>入网状态：</span>
                        <Select defaultValue="lucy" style={{ width: 200 }} allowClear>
                            <Option value="lucy">Lucy</Option>
                        </Select>
                        <span style={{ marginLeft: '53px' }}>设备ID：</span>
                        <Search placeholder="请输入设备ID" onSearch={onSearch} enterButton style={{ width: 465 }} />
                    </div>
                    <Button type="primary" onClick={openRegist}>注册设备</Button>
                </div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
            {
                modelVis && <RegistModel isModalVisible={modelVis} cancelModel={cancelModel} colseMoadl={colseMoadl}></RegistModel>
            }
        </div>
    )
}