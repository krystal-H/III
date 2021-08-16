import React, { useState, useEffect } from 'react'
import { Select, Steps, Button, Input, Space, Table, Form } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import stepImg from '../../../assets/images/product-regist.png';
import AddSubScribe from './addModal'
import { post, Paths, get } from '../../../api';
import './index.scss'
const { Option } = Select;
const { Step } = Steps;
const { Search } = Input;
export default function DeviceRegist() {
    const [form] = Form.useForm();
    const [deviceNameS, setDeviceNameS] = useState([])
    const [productCount, SetproductCount] = useState({})
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
            title: '订阅ID',
            dataIndex: 'urlConfId',
            key: 'urlConfId',
        },
        {
            title: '订阅名称',
            dataIndex: 'subscription',
            key: 'subscription',
        },
        {
            title: '订阅方式',
            dataIndex: 'pushWay',
            key: 'pushWay',
            render: (text) => (
                <span>{text ? 'MQTT主题订阅' : 'API数据PUSH形'}</span>
            )
        }, {
            title: '归属产品名称',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '订阅更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
        }, {
            title: '状态',
            dataIndex: 'pushState',
            key: 'pushState',
            render: (text) => (
                <span>{text ? '正常' : '停用'}</span>
            )
        },
        {
            title: '操作',
            render: (text, record) => (
                <Space size="middle">
                    <a>查看</a>
                    <a>编辑</a>
                    <a>停用</a>
                    <a>启动</a>
                </Space>
            )
        },
    ];
    useEffect(() => {
        getList()
    }, [])
    const downFile = () => {
        alert(10)
    }
    //搜索
    const onSearch = () => {
        getList()
    };
    //获取列表
    const getList = (load = true) => {
        let params = form.getFieldsValue();
        post(Paths.subscribeList, params, { load }).then((res) => {
            setDataSource(res.data.list)
        });
    }
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
                        <Option value="0">API数据PUSH形式 </Option>
                        <Option value="1">MQTT主题订阅</Option>
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
                        {/* <span>订阅方式：</span>
                        <Select style={{ width: 200 }} allowClear>
                            <Option value="0">API数据PUSH形式 </Option>
                            <Option value="1">MQTT主题订阅</Option>
                        </Select>
                        <span style={{ marginLeft: '53px' }}>订阅名称：</span>
                        <Search onSearch={onSearch} enterButton style={{ width: 465 }} /> */}
                        <Form className='device-filter-form' form={form} layout='inline'>
                            <Form.Item name="push_way" label="订阅方式" >
                                <Select
                                    allowClear
                                    style={{ width: '200px' }}
                                >
                                    <Option value='1'>API数据PUSH形式</Option>
                                    <Option value='0'>MQTT主题订阅</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name='subscription'
                                label="订阅名称"
                            >
                                <Input style={{ width: '228px' }} />
                            </Form.Item>
                            <Form.Item label=" " colon={false} style={{ marginRight: '2px' }}>
                                <Button type="primary" onClick={onSearch}>
                                    查询
                                </Button>
                            </Form.Item>
                        </Form>

                    </div>
                    <Button type="primary" onClick={openRegist}>添加订阅</Button>
                </div>
                <Table rowKey='urlConfId' dataSource={dataSource} columns={columns} />
            </div>
            {
                modelVis && <AddSubScribe isModalVisible={modelVis} cancelModel={cancelModel} colseMoadl={colseMoadl}></AddSubScribe>
            }
        </div>
    )
}