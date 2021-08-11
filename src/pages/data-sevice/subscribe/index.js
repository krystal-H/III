import React, { useState, useEffect } from 'react'
import { Select, Steps, Button, Input, Space, Table } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import stepImg from '../../../assets/images/product-regist.png';
import AddSubScribe from './addModal'
import './index.scss'
const { Option } = Select;
const { Step } = Steps;
const { Search } = Input;
export default function DeviceRegist() {
    const [deviceNameS, setDeviceNameS] = useState([])
    const [productCount, SetproductCount] = useState({})
    const [dataSource, setDataSource] = useState([])
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
    //新增订阅
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
        <div id='subscribe-data'>
            <PageTitle title='数据订阅'>
                <div className='top-select'>
                    <Select defaultValue="lucy" style={{ width: 200 }} allowClear>
                        <Option value="lucy">Lucy</Option>
                    </Select>
                </div>
            </PageTitle>
            <div className='comm-shadowbox setp-ttip'>
                <div className='step-title'>
                    <img src={stepImg} />
                    <span>数据订阅步骤</span>
                </div>
                <Steps current={-1} initial={0}>
                    <Step title="选择产品" description="可根据产品订阅以及设备性能标签，选择需要的数据对象。" />
                    <Step title="配置订阅内容" description="可知产品或设备的物模型，订阅详细的功能点数据信息。" />
                    <Step title="确定订阅方式" description='支持数据发送服务或MQTT订阅，两种不同的方式。' />
                </Steps>
            </div>
            <div className='comm-shadowbox device-content'>
                <div className='content-top'>
                    <div className='content-top-left'>
                        <span>类型：</span>
                        <Select defaultValue="lucy" style={{ width: 200 }} allowClear>
                            <Option value="lucy">Lucy</Option>
                        </Select>
                        <span style={{ marginLeft: '53px' }}>功能名称：</span>
                        <Search  onSearch={onSearch} enterButton style={{ width: 465 }} />
                    </div>
                    <Button type="primary" onClick={openRegist}>添加订阅</Button>
                </div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
            {
                modelVis && <AddSubScribe isModalVisible={modelVis} cancelModel={cancelModel} colseMoadl={colseMoadl}></AddSubScribe>
            }
        </div>
    )
}