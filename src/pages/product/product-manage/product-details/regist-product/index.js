import React, { useState, useEffect } from 'react'
import { Select, Steps, Button, Input, Space, Table, Form } from 'antd';
import stepImg from '../../../../../assets/images/product-regist.png';
import CountNum from '../../../../../components/CountNum/index';
import { netStatus } from '../../../../../configs/text-map';
import { post, Paths, get } from '../../../../../api';
import { DateTool } from '../../../../../util/util';
import { Notification } from '../../../../../components/Notification';
import './index.scss'
import RegistModel from './modelFn'
const { Option } = Select;
const { Step } = Steps;
export default function DeviceRegist() {
    let productItem = {}
    if (sessionStorage.getItem('productItem')) {
        productItem = JSON.parse(sessionStorage.getItem('productItem'))
    }
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const [countData, setCountData] = useState([{ label: '设备总数量', count: 0 }, { label: '已入网设备', count: 0 }, { label: '未入网设备', count: 0 }])
    const filter = (data) => {
        if (data == 0) {
            return '一型一密'
        } else if (data == 1) {
            return '一型一密plus'
        } else if (data == 2) {
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
            render: (text) => (
                <span >{filter(text)}</span>
            )
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
            render(activeTime) {
                return activeTime && DateTool.utcToDev(activeTime);
            }
        }
    ];
    const [authWay, setAuthWay] = useState(0)
    const getBusinessInfo = () => {
        let productId = productItem.productId
        post(Paths.proReledInfo, { productId }).then((res) => {
            let data = res.data || {}
            setAuthWay(data.authorityType)
        });
    }
    useEffect(() => {
        getStatistical()
        getBusinessInfo()
    }, [])
    //获取统计
    const getStatistical = () => {
        post(Paths.proReledCount, { productId: productItem.productId }).then((res) => {
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
        Notification({
            type: 'success',
            description: '注册成功！',
        });
        setModelVis(false)
    }
    //搜索
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
    useEffect(() => {
        getList()
    }, [pager.pageIndex, pager.pageRows])
    //获取列表
    const getList = (loading = true) => {
        let params = { ...pager, productId: productItem.productId }
        if (form.getFieldValue('status') != -1) {
            params.status = form.getFieldValue('status')
        }
        if (form.getFieldValue('id') && form.getFieldValue('id').trim()) {
            params.id = form.getFieldValue('id')
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
    //导出
    const exportFile = () => {
        let params = { productId: productItem.productId, type: 'product' }
        if (form.getFieldValue('status') != -1) {
            params.status = form.getFieldValue('status')
        }
        if (form.getFieldValue('id') && form.getFieldValue('id').trim()) {
            params.id = form.getFieldValue('id')
        }
        post(Paths.exportRegistFile, params).then((res) => {
            window.open(res.data)
        });
    }
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
                    <Step title="查看入网设备" description="安全级别最高的设备ID&设备密钥验证，即一机一码，需要下载密钥文件。" />
                </Steps>
            </div>
            <CountNum data={countData} />
            <div className='comm-shadowbox device-content'>
                <div className='content-top'>
                    <div className='content-top-left'>
                        <Form className='device-filter-form' form={form} layout='inline' initialValues={{ status: '-1' }}>
                            <Form.Item name="status" label="入网状态" >
                                <Select
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
                    {/* <Button type="primary" onClick={openRegist}>注册设备</Button> */}
                    <div>
                        <Button type="primary" onClick={exportFile} style={{ marginRight: '15px' }}>导出数据</Button>
                        <Button type="primary" onClick={openRegist}>注册设备</Button>
                    </div>
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
                modelVis && <RegistModel isModalVisible={modelVis} cancelModel={cancelModel} colseMoadl={colseMoadl} authWay={authWay}></RegistModel>
            }
        </div>
    )
}