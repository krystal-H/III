import React, { useState, useEffect } from 'react'
import { Select, Steps, Button, Input, Table, Form } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import stepImg from '../../../assets/images/product-regist.png';
import CountNum from '../../../components/CountNum/index';
import { post, Paths, get } from '../../../api';
import { netStatus } from '../../../configs/text-map'
import { DateTool } from '../../../util/util';
import { Notification } from '../../../components/Notification';
import './index.scss'
import RegistModel from './regist'
const { Option } = Select;
const { Step } = Steps;
export default function DeviceRegist() {
    const [form] = Form.useForm();
    const [deviceNameS, setDeviceNameS] = useState([])
    const [productCount, SetproductCount] = useState({})
    const [dataSource, setDataSource] = useState([])
    const [optionArr, setOptionArr] = useState([]) //产品列表
    const [selectType, setSelectType] = useState('') //产品种类
    const [countData, setCountData] = useState([{ label: '设备总数量', count: 0 }, { label: '已入网设备', count: 0 }, { label: '未入网设备', count: 0 }])

    useEffect(() => {
        getProductType()
        getCount()
    }, [])
    const downFile = () => {
        // alert(10)
    }
    //统计
    const getCount = (productId) => {
        let params = {}
        if (productId) {
            params.productId = productId
        }
        post(Paths.proReledCount, params).then((res) => {
            setCountData([{ label: '设备总数量', count: res.data.total },
            { label: '已入网设备', count: res.data.activate },
            { label: '未入网设备', count: res.data.unactivate }])
        });
    }
    //产品种类列表
    const getProductType = () => {
        post(Paths.getProductPlus, {}).then((res) => {
            res.data.unshift({ productId:0, productName: '全部产品' })
            setOptionArr(res.data)
        });
    }
    //产品改变
    const selectChange = (value) => {
        setPager(pre => {
            let obj = JSON.parse(JSON.stringify(pre))
            return Object.assign(obj, { pageIndex: 1 })
        })
        getCount(value)
        setSelectType(value)
    }
    //搜索
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
    useEffect(() => {
        getList()
    }, [pager.pageIndex, pager.pageRows, selectType])
    //获取列表
    const getList = (loading = true) => {
        let params = { ...form.getFieldsValue(), ...pager }
        if (selectType) {
            params.productId = selectType
        }
        if (!params.id || !params.id.trim()) {
            delete params.id
        }
        post(Paths.proReledRegist, params, { loading }).then((res) => {
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
    //注册
    const [modelVis, setModelVis] = useState(false)
    const openRegist = () => {
        setModelVis(true)
    }
    const cancelModel = () => {
        setModelVis(false)
    }
    const colseMoadl = () => {
        Notification({
            type: 'success',
            description: '注册成功！',
        });
        setModelVis(false)
    }
    const tableFilterFn = (count) => {
        if (count === 0) {
            return '一型一密'
        } else if (count === 1) {
            return '一型一密plus'
        } else if (count === 2) {
            return '一机一密'
        }
    }
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
            render: text => tableFilterFn(text)
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

    return (
        <div id='device-regist'>
            <PageTitle title='设备注册'>
                <div className='top-select'>
                    <Select style={{ width: 200 }} defaultValue={0} onChange={selectChange}>
                        {
                            optionArr.map(item => {
                                return (<Option value={item.productId} key={item.productId}>{item.productName}</Option>)
                            })
                        }
                    </Select>
                </div>
            </PageTitle>
            <div className='comm-shadowbox comm-setp-ttip'>
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
                modelVis && <RegistModel isModalVisible={modelVis} cancelModel={cancelModel} colseMoadl={colseMoadl} optionArr={optionArr}></RegistModel>
            }
        </div>
    )
}