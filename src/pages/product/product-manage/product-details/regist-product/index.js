import React, { useState, useEffect } from 'react'
import { Select, Steps, Button, Input, Space, Table, Form } from 'antd';
import stepImg from '../../../../../assets/images/product-regist.png';
import CountNum from '../../../../../components/CountNum/index';
import { netStatus } from '../../../../../configs/text-map';
import { post, Paths, get } from '../../../../../api';
import { DateTool } from '../../../../../util/util';
import './index.scss'
import RegistModel from './modelFn'
const { Option } = Select;
const { Step } = Steps;
export default function DeviceRegist() {
    const [form] = Form.useForm();
    const [deviceNameS, setDeviceNameS] = useState([])
    const [productCount, SetproductCount] = useState({})
    const [dataSource, setDataSource] = useState([])
    const [countData, setCountData] = useState([{ label: '设备总数量', count: 0 }, { label: '已入网设备', count: 0 }, { label: '未入网设备', count: 0 }])
    const columns = [
        {
            title: '设备ID',
            dataIndex: 'did',
            key: 'did',
        },
        {
            title: '物理地址',
            dataIndex: 'physicalAddr',
            key: 'physicalAddr',
        },
        {
            title: '通信验证方式',
            dataIndex: 'authorityType',
            key: 'authorityType',
        }, {
            title: '设备秘钥',
            dataIndex: 'deviceSecret',
            key: 'deviceSecret',
        }, {
            title: '入网状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <span >{text ? '已入网' : '未入网'}</span>
            )
        }, {
            title: '入网时间',
            dataIndex: 'activeTime',
            key: 'activeTime',
            render(updateTime) {
                return DateTool.utcToDev(updateTime);
            }
        }
    ];
    useEffect(() => {
        getStatistical()
    }, [])
    //获取统计
    const getStatistical = () => {
        post(Paths.proReledCount).then((res) => {
            setCountData([{ label: '设备总数量', count: res.data.total },
            { label: '已入网设备', count: res.data.activate },
            { label: '未入网设备', count: res.data.unactivate }])
        });
    }
    const downFile = () => {
    }

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
    //搜索
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
    useEffect(() => {
        getList()
    }, [pager.pageIndex, pager.pageRows])
    //获取列表
    const getList = (loading = true) => {
        let params = { ...form.getFieldsValue(), ...pager, productId: 11549 }
        post(Paths.proReledRegist, params, { load }).then((res) => {
            setDataSource(res.data.list)
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { totalRows: res.data.pager.totalRows })
            })
        });
    }
    //页码改变
    const pagerChange = (pageIndex, pageRows) => {
        if (pageRows == pager.pageRows) {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex, pageRows })
            })
        } else {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex: 1, pageRows })
            })
        }

    }
    const onSearch = () => {
        if (pager.pageIndex === 1) {
            getList()
        } else {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex: 1 })
            })
        }
    };
    return (
        <div id='product-device-regist'>
            <div className='comm-shadowbox setp-ttip'>
                <div className='step-title'>
                    <img src={stepImg} alt='' />
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
                        <Form className='device-filter-form' form={form} layout='inline'>
                            <Form.Item name="status" label="入网状态" >
                                <Select
                                    allowClear
                                    style={{ width: '200px' }}
                                >
                                    {
                                        netStatus.map(item => {
                                            return (<Option value={item.key} key={item.key}>{item.value}</Option>)
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="请输入设备ID"
                            >
                                <Form.Item
                                    name='id'
                                    noStyle
                                >
                                    <Input style={{ width: '465px' }} placeholder="请输入设备ID" />
                                </Form.Item>
                                <Button type="primary" onClick={onSearch}>
                                    查询
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Button type="primary" onClick={openRegist}>注册设备</Button>
                </div>
                <Table rowKey='did' dataSource={dataSource} columns={columns} pagination={{
                    defaultCurrent: 1,
                    current: pager.pageIndex,
                    onChange: pagerChange,
                    pageSize: pager.pageRows,
                    total: pager.totalRows,
                    showQuickJumper: true,
                    pageSizeOptions: [10],
                    showTotal: () => <span>共 <a>{pager.totalRows}</a> 条</span>
                }} />
            </div>
            {
                modelVis && <RegistModel isModalVisible={modelVis} cancelModel={cancelModel} colseMoadl={colseMoadl}></RegistModel>
            }
        </div>
    )
}