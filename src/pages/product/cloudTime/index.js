import React, { useState, useEffect } from 'react'
import { Select, Steps, Button, Input, Table, Divider } from 'antd'
import PageTitle from '../../../components/page-title/PageTitle'
import stepImg from '../../../assets/images/product-regist.png'
import { cloudStatus } from '../../../configs/text-map'
import { setFuncDataType } from '../../../util/util'
import { Paths, post, get } from '../../../api'
import { CloudAddForm } from './cloud-manage-modals'
import CloudUpdate from './cloud-update'
import { cloneDeep } from 'lodash'
import './index.scss'

const { Option } = Select;
const { Step } = Steps;
const { Search } = Input;

export default function CloudTime() {
    const [operate, setOperate] = useState(null)
    const [cloudAddVisible, setCloudAddVisible] = useState(false) // 新建
    const [cloudUpdateVisible, setCloudUpdateVisible] = useState(false) // 删除

    const [allProductList, setAllProductList] = useState([])
    const [currentProductId, setCurrentProductId] = useState('')
    const [currentServiceName, setcurrentServiceName] = useState('')

    const [cloudEditVisible, setCloudEditVisible] = useState(false)
    const [usedPropertys, setUsedPropertys] = useState([])

    const columns = [
        {
            title: '功能名称',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: '关联协议',
            dataIndex: 'propertyName',
            key: 'propertyName',
            render: (text, record) => (
                <div>
                    {
                        record.timeServerDetails && record.timeServerDetails.map((item, index) => {
                            return <div key={index}>{item.propertyName}</div>
                        })
                    }
                </div>
            )
        },
        {
            title: '协议数据标识',
            dataIndex: 'property',
            key: 'property',
            render: (text, record) => (
                <div>
                    {
                        record.timeServerDetails && record.timeServerDetails.map((item, index) => {
                            return <div key={index}>{item.property}</div>
                        })
                    }
                </div>
            )
        }, {
            title: '归属产品名称',
            dataIndex: 'productName',
            key: 'productName',
        }, {
            title: '协议数据类型',
            dataIndex: 'functionDataType',
            key: 'functionDataType',
            // width: 160,
            render: (text, record) => (
                <div>
                    {
                        record.timeServerDetails && record.timeServerDetails.map((item, index) => {
                            return <div key={index}>{setFuncDataType(item)}</div>
                        })
                    }
                </div>
            )
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (text, record) => (
                <span>
                    {cloudStatus[record.status]}
                </span>
            )
        }, {
            title: '操作',
            key: 'action',
            width: 200,
            render: (text, record) => (
                <span>
                    {
                        record.status !== 1 ?
                            <React.Fragment>
                                <a onClick={() => { setCloudEditVisible(true) }}>编辑</a>
                                <Divider type="vertical" />
                                <a onClick={() => { operateHandle(1) }}>发布</a>
                                <Divider type="vertical" />
                                <a onClick={() => { operateHandle(2) }}>删除</a>
                            </React.Fragment>
                            :
                            <a onClick={() => { operateHandle(3) }}>下线</a>
                    }
                </span>
            ),
        }
    ]
    const [dataSource, setDataSource] = useState([])
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 6 })

    useEffect(() => {
        getCloudGetProductList()
    }, [])

    useEffect(() => {
        getTimeList()
    }, [pager.pageIndex, pager.pageRows, currentServiceName, currentProductId]) // eslint-disable-line react-hooks/exhaustive-deps

    // 获取产品列表
    const getCloudGetProductList = () => {
        get(Paths.cloudGetProductList).then(res => {
            setAllProductList(res.data)
        }, () => setAllProductList([]))
    }

    //  获取云端定时列表
    const getTimeList = () => {
        post(Paths.getTimeServiceList, {
            serviceName: currentServiceName || '',
            productId: currentProductId || '',
            ...pager
        }, {loading: true}).then((res) => {
            setDataSource(res.data.list)
            setPager(pre => {
                return Object.assign(cloneDeep(pre), { totalRows: res.data.pager.totalRows })
            })
        })
    }

    //页码改变
    const pagerChange = (pageIndex, pageRows) => {
        if (pageRows === pager.pageRows) {
            setPager(pre => {
                return Object.assign(cloneDeep(pre), { pageIndex, pageRows })
            })
        } else {
            setPager(pre => {
                return Object.assign(cloneDeep(pre), { pageIndex: 1, pageRows })
            })
        }
    }

    //搜索
    const onSearch = value => {
        setcurrentServiceName(value)
    }

    // table操作-发布、删除、下线
    const operateHandle = (type) => {
        setCloudUpdateVisible(true)
        setOperate(type)
    }

    // 发布、删除、下线  弹框确定
    const updateOkHandle = () => {
        console.log('确定-调接口')
        alert('确定-调接口')
        setCloudUpdateVisible(false)
    }

    // 发布、删除、下线  弹框取消
    const close = () => {
        setCloudUpdateVisible(false)
    }

    return (
        <div id='cloud-time'>
            <PageTitle title='云端定时'>
                <div className='top-select'>
                    <Select style={{ width: 200 }} allowClear
                        onChange={val => setCurrentProductId(val)}>
                        {
                            allProductList && allProductList.map(item => (
                                <Option key={item.productId} value={item.productId}>{item.productName}</Option>
                            ))
                        }
                    </Select>
                </div>
            </PageTitle>
            <div className='comm-shadowbox setp-tip'>
                <div className='step-title'>
                    <img src={stepImg} alt="" />
                    <span>云端定时步骤</span>
                </div>
                <Steps current={-1} initial={0}>
                    <Step title="创建定时功能" description="可以使用产品的控制数据功能的点，创建定时功能。" />
                    <Step title="发布定时功能" description="定时功能确认无误后，可以发布到Clife或您创建的App上。" />
                    <Step title="App端配置" description="在App端基于已经发布的定时功能，配置定时任务。" />
                    <Step title="App端应用" description="满足定时任务的触发条件后，自动发送指令控制设备。" />
                </Steps>
            </div>
            <div className='comm-shadowbox device-content'>
                <div className='content-top'>
                    <div className='content-top-left'>
                        <Search placeholder="请输入功能名称" onSearch={onSearch} allowClear enterButton style={{ width: 465 }} />
                    </div>
                    <Button type="primary" onClick={() => setCloudAddVisible(true)}>创 建</Button>
                </div>
                <Table rowKey="serviceId" dataSource={dataSource} columns={columns}
                    pagination={{
                        defaultCurrent: 1,
                        current: pager.pageIndex,
                        onChange: pagerChange,
                        pageSize: pager.pageRows,
                        total: pager.totalRows,
                        showQuickJumper: true,
                        
                    }} />
            </div>
            {/* 创建 */}
            {
                cloudAddVisible &&
                <CloudAddForm
                    visible={cloudAddVisible}
                    type="add"
                    allProductList={allProductList}
                    onCancel={() => setCloudAddVisible(false)}></CloudAddForm>
            }

            {/* 编辑 */}
            {
                cloudEditVisible &&
                <CloudAddForm
                    visible={cloudEditVisible}
                    type="edit"
                    onCancel={() => setCloudEditVisible(false)} />
            }

            {/* 发布、删除、下线 */}
            {
                cloudUpdateVisible &&
                <CloudUpdate
                    visible={cloudUpdateVisible}
                    operate={operate}
                    updateOkHandle={() => updateOkHandle()}
                    updateCancelHandle={() => close()} />
            }
        </div>
    )
}
