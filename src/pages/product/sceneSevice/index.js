import React, { useState, useEffect } from 'react'
import { Select, Steps, Button, Input, Table, Form } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import stepImg from '../../../assets/images/product-regist.png';
import CountNum from '../../../components/CountNum/index';
import { post, Paths, get } from '../../../api';
// import { netStatus } from '../../../configs/text-map'
import { DateTool } from '../../../util/util';
import { Notification } from '../../../components/Notification';
import './index.scss'
const { Option } = Select;
const { Step } = Steps;
const netStatus = [{
    value: '条件', key: 1
}, {
    value: '任务', key: 2
}]
export default function DeviceRegist() {
    const [form] = Form.useForm();
    const [deviceNameS, setDeviceNameS] = useState([])
    const [productCount, SetproductCount] = useState({})
    const [dataSource, setDataSource] = useState([])
    const [optionArr, setOptionArr] = useState([]) //产品列表
    const [selectType, setSelectType] = useState('') //产品种类
    useEffect(() => {
        getProductType()
    }, [])
    const downFile = () => {
        alert(10)
    }
    //产品种类列表
    const getProductType = () => {
        post(Paths.getProductPlus, {}).then((res) => {
            setOptionArr(res.data)
        });
    }
    //产品改变
    const selectChange = (value) => {
        setPager(pre => {
            let obj = JSON.parse(JSON.stringify(pre))
            return Object.assign(obj, { pageIndex: 1 })
        })
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
        post(Paths.scenceList, params, { loading }).then((res) => {
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
            title: '类型',
            dataIndex: 'did',
            key: 'did',
        },
        {
            title: '数据类型',
            dataIndex: 'physicalAddr',
            key: 'physicalAddr',
        },
        {
            title: '归属产品名称',
            dataIndex: 'authorityType',
            key: 'authorityType',
            render: text => tableFilterFn(text)
        }, {
            title: '状态',
            dataIndex: 'deviceSecret',
            key: 'deviceSecret',
        }, {
            title: '功能名称',
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <span >{text ? '条件' : '任务'}</span>
            )
        }, {
            title: '操作',
            dataIndex: 'activeTime',
            key: 'activeTime',
            render(updateTime) {
                return <a>删除</a>
            }
        }
    ];

    return (
        <div id='device-regist'>
            <PageTitle title='场景服务'>
                <div className='top-select'>
                    <Select style={{ width: 200 }} allowClear onChange={selectChange}>
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
                    <span>配置场景步骤</span>
                </div>
                <Steps current={-1} initial={0}>
                    <Step title="配置自动化" description="进入产品设备联动服务，配置自动化条件和动作" />
                    <Step title="验证自动化" description="可通过调试验证工具，对条件和动作进行功能验证。" />
                    <Step title="发布自动化" description="查看升级包各升级批次的具体设备列表，以及各设备的升级状态。" />
                    <Step title="配置场景" description="使用已发布的自动化条件和动作配置场景。" />
                </Steps>
            </div>
            <div className='comm-shadowbox device-content'>
                <div className='content-top'>
                    <div className='content-top-left'>
                        <Form className='device-filter-form' form={form} layout='inline'>
                            <Form.Item name="status" label="类型" >
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
                                label="功能名称"
                            >
                                <Form.Item
                                    name='id'
                                    noStyle
                                >
                                    <Input style={{ width: '465px' }} placeholder="功能名称" />
                                </Form.Item>
                                <Button type="primary" onClick={onSearch}>
                                    查询
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Button type="primary" onClick={openRegist}>自定义</Button>
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

        </div>
    )
}