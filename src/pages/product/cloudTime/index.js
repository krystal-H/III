import React, { useState, useEffect } from 'react'
import { Select, Steps, Button, Input, Table, Divider } from 'antd'
import PageTitle from '../../../components/page-title/PageTitle'
import stepImg from '../../../assets/images/product-regist.png'
import { cloudStatus } from '../../../configs/text-map'
import { Paths, post, get } from '../../../api'
import { CloudAddForm } from './cloud-manage-modals'
import CloudUpdate from './cloud-update'
import { cloneDeep } from 'lodash'
import { Notification } from '../../../components/Notification'
import './index.scss'

const { Option } = Select;
const { Step } = Steps;
const { Search } = Input;

export default function CloudTime() {
    const [operate, setOperate] = useState(null)
    const [cloudAddVisible, setCloudAddVisible] = useState(false) // 新建
    const [cloudUpdateVisible, setCloudUpdateVisible] = useState(false) // 删除

    const [currentProductId, setCurrentProductId] = useState('')
    const [currentServiceName, setcurrentServiceName] = useState('')

    const [cloudEditVisible, setCloudEditVisible] = useState(false) // 编辑
    const [editData, setEditData] = useState([]) // 编辑数据
    const [changeStatus, setChangeStatus] = useState([]) // 操作数据状态

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
            render: (text, record) => (
                <div>
                    {
                        record.timeServerDetails && record.timeServerDetails.map((item, index) => (
                            <div key={index}>{item.functionDataType}</div>
                        ))
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
                                <a onClick={() => { editCloudTime(record) }}>编辑</a>
                                <Divider type="vertical" />
                                <a onClick={() => { operateHandle(record, 1) }}>发布</a>
                                <Divider type="vertical" />
                                <a onClick={() => { operateHandle(record, 2) }}>删除</a>
                            </React.Fragment>
                            :
                            <a onClick={() => { operateHandle(record, 0) }}>下线</a>
                    }
                </span>
            ),
        }
    ]
    const [dataSource, setDataSource] = useState([])
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 6 })

    useEffect(() => {
        getTimeList()
    }, [pager.pageIndex, pager.pageRows, currentServiceName, currentProductId]) // eslint-disable-line react-hooks/exhaustive-deps

    // 编辑
    const editCloudTime = (record) => {
        setEditData(record)
        setCloudEditVisible(true)
    }

    // 获取云端定时列表
    const getTimeList = () => {
        post(Paths.getTimeServiceList, {
            serviceName: currentServiceName || '',
            productId: currentProductId || '',
            ...pager
        }, { loading: true }).then((res) => {
            setDataSource(res.data.list)
            setPager(pre => {
                return Object.assign(cloneDeep(pre), { totalRows: res.data.pager.totalRows })
            })
        })
    }

    // 翻页
    const pagerChange = (pageIndex, pageRows) => {
        setPager(pre => {
            return Object.assign(cloneDeep(pre), { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
        })
    }

    // 操作-发布、删除、下线
    const operateHandle = (record, type) => {
        setChangeStatus(record)
        setCloudUpdateVisible(true)
        setOperate(type)
    }

    // 发布、删除、下线  弹框确定
    const updateOkHandle = (type) => {
        post(Paths.updateTimeServiceStatus, {
            serviceId: changeStatus.serviceId,
            productId: changeStatus.productId,
            status: type
        }, { loading: true }).then(res => {
            Notification({ description: '操作成功！', type: 'success' })
            setCloudUpdateVisible(false)
            getTimeList()
        })
    }

    return (
        <div id='cloud-time'>
            <PageTitle title='云端定时' selectOnchange={val => setCurrentProductId(val)}>
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
                        <Search placeholder="请输入功能名称"
                            allowClear
                            style={{ width: 465 }}
                            onSearch={(value) => setcurrentServiceName(value)} />
                    </div>
                    <Button type="primary" onClick={() => setCloudAddVisible(true)}>创 建</Button>
                </div>
                <Table rowKey="serviceId"
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{
                        defaultCurrent: 1,
                        current: pager.pageIndex,
                        onChange: pagerChange,
                        pageSize: pager.pageRows,
                        total: pager.totalRows,
                        showQuickJumper: pager.totalPages > 5
                    }} />
            </div>
            {/* 创建 */}
            {
                cloudAddVisible &&
                <CloudAddForm
                    visible={cloudAddVisible}
                    type="add"
                    onCancel={() => {
                        setCloudAddVisible(false)
                        getTimeList()
                    }}></CloudAddForm>
            }
            {/* 编辑 */}
            {
                cloudEditVisible &&
                <CloudAddForm
                    visible={cloudEditVisible}
                    type="edit"
                    editData={editData}
                    onCancel={() => {
                        setCloudEditVisible(false)
                        getTimeList()
                    }} />
            }
            {/* 发布、删除、下线 */}
            {
                cloudUpdateVisible &&
                <CloudUpdate
                    visible={cloudUpdateVisible}
                    operate={operate}
                    changeStatus={changeStatus}
                    updateOkHandle={() => updateOkHandle(operate)}
                    updateCancelHandle={() => setCloudUpdateVisible(false)} />
            }
        </div>
    )
}
