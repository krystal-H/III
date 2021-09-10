import React, { useState, useEffect } from 'react'
import { Button, Table, Divider, Select, Steps, Input, Form } from 'antd'
import { DateTool, addKeyToTableData } from '../../../util/util'
import PageTitle from '../../../components/page-title/PageTitle'
import stepImg from '../../../assets/images/remote-config.png'
import DescWrapper from '../../../components/desc-wrapper/DescWrapper'
import ActionConfirmModal from '../../../components/action-confirm-modal/ActionConfirmModal'
import { cloneDeep } from 'lodash'
import CreateTaskModal from './createTaskModal'
import { Paths, post, get } from '../../../api'
import CheckDetailModal from './checkDetailModal'

import './index.scss'
import { Notification } from '../../../components/Notification'

const { Option } = Select
const { Step } = Steps
const { Search } = Input
const DESC = ['平台支持远程更新设备的配置数据，您可以提交远程配置任务，实时对设备的系统参数等数据进行远程更新，并且获取设备配置的更新状态；详细说明可参考文档']

const PAGE_ROWS = 10
const statusText = ['', '待执行', '执行中', '已执行']
const statusTextForDevice = ['', '执行中', '执行成功', '执行失败']

function RemoteConfig(remoteType = 'product') {
    const [configProtoclList, setConfigProtoclList] = useState([])
    const [addVisible, setAddVisible] = useState(false)
    const [editData, setEditData] = useState({})
    const [detailData, setDetailData] = useState({})
    const [detailVisible, setDetailVisible] = useState(false)
    const [remoteConfigPager, setRemoteConfigPager] = useState({ pageIndex: 1 })
    const [deleteParams, setDeleteParams] = useState({ deletevisible: false, deleteItem: null, deleteLoading: false })
    const [remoteConfigList, setRemoteConfigList] = useState([]) // table-datasorce

    const [currentProductId, setCurrentProductId] = useState('')  // 下拉选中产品id
    const [status, setStatus] = useState('') // 状态
    const [allProductList, setAllProductList] = useState([]) // 下拉所有产品列表
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 6 })

    const { totalRows, pageIndex, pageRows } = remoteConfigPager
    const { deletevisible, deleteItem, deleteLoading } = deleteParams

    const PageColumns = [
        {
            title: '任务ID',
            dataIndex: 'taskId',
            key: 'taskId',
        },
        {
            title: '任务名称',
            dataIndex: 'taskName',
            key: 'taskName'
        },
        {
            title: '任务说明',
            dataIndex: 'taskExplain',
            key: 'taskExplain',
            width: 300
        },
        {
            title: '归属产品名称',
            dataIndex: 'productName',
            key: 'productName'
        },
        {
            title: '更新设备数量',
            dataIndex: 'deviceTotal',
            key: 'deviceTotal',
        },
        {
            title: '任务状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                let { status } = record;
                return <span className={`h5-statu-${status + 1}`}>{statusText[status]}</span>
            }
        },
        {
            title: '执行时间',
            dataIndex: 'execTime',
            key: 'execTime',
            render: (text, record) => {
                let { execTime } = record;
                return <span>{execTime ? DateTool.utcToDev(execTime) : '--'}</span>
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                const { status, taskId } = record
                return (
                    <span>
                        {
                            ('' + status) === '1' ?
                                <React.Fragment>
                                    <a onClick={() => addOrEditRemoteConfig(record)}>编辑</a>
                                    <Divider type="vertical" />
                                    <a onClick={() => executeRemoteConfig(record)}>执行</a>
                                    <Divider type="vertical" />
                                    <a onClick={() => setDeleteParams({ deletevisible: true, deleteItem: record })}>删除</a>
                                </React.Fragment> :
                                <a onClick={() => showRomoteConfigDetail(record)}>查看</a>
                        }
                    </span>
                )
            }
        }
    ]

    // 编辑
    const addOrEditRemoteConfig = (record) => {
        // return alert('敬请期待！')
        if (record) { // 编辑
            post(Paths.getRemoteConfig5x, { taskId: record.taskId }, { loading: true }).then(res => {
                setEditData(res.data)
                setAddVisible(!addVisible)
            })
        } else {
            setAddVisible(!addVisible)
        }
    }

    // 执行任务
    const executeRemoteConfig = (record) => {
        post(Paths.executeTask5x, { taskId: record.taskId }, { loading: true }).then(res => {
            getRemoteConfigList()
            Notification({ description: '执行成功！', type: 'success' })
        })
    }

    // 查看详情
    const showRomoteConfigDetail = (record) => {
        post(Paths.getRemoteConfig5x, { taskId: record.taskId }, { loading: true }).then(res => {
            setDetailData(res.data)
            setDetailVisible(true)
        })
    }

    // 获取远程配置列表
    const getRemoteConfigList = (_pageIndex, status = '', taskName = '') => {
        const params = {
            productId: currentProductId,
            pageRows: PAGE_ROWS,
            pageIndex: _pageIndex || pageIndex,
            status,
            taskName
        }
        post(Paths.getRomoteConfigListByProduct5x, params, { loading: true }).then(res => {
            setRemoteConfigList(addKeyToTableData(res.data.list))
            setPager(pre => {
                return Object.assign(cloneDeep(pre), { totalRows: res.data.pager.totalRows })
            })
        })
    }

    useEffect(() => {
        getRemoteConfigList()
    }, [pager.pageIndex, pager.pageRows, status, currentProductId])  // eslint-disable-line react-hooks/exhaustive-deps

    // 获取所有产品列表
    const getCloudGetProductList = () => {
        get(Paths.cloudGetProductList, { loading: true }).then(res => {
            setAllProductList(res.data)
        }, () => setAllProductList([]))
    }

    useEffect(() => { getCloudGetProductList() }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // 查询列表数据
    const searchListData = (val) => {
        getRemoteConfigList(pageIndex, status, val)
    }

    // 翻页
    // pageRows 一页几条数据
    // totalRows 总行数
    // pageIndex 第几页
    const pagerChange = (pageIndex, pageRows) => {
        setPager(pre => {
            return Object.assign(cloneDeep(pre), { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
        })
    }

    // 确定删除
    const deletelOKHandle = () => {
        const { taskId } = deleteItem
        setDeleteParams({ ...deleteParams, deleteLoading: true })
        post(Paths.deleteRemoteConfig, {
            taskId
        }, { loading: true }).then(data => {
            getRemoteConfigList()
        }).finally(() => {
            setDeleteParams({ deletevisible: false, deleteItem: null, deleteLoading: false })
        })
    }

    return (
        <div id='remote-config'>
            <PageTitle title='远程配置' selectOnchange={val => setCurrentProductId(val)}></PageTitle>
            <div className='comm-shadowbox setp-tip'>
                <div className='step-title'>
                    <img src={stepImg} alt="" />
                    <span>远程配置步骤</span>
                </div>
                <DescWrapper desc={DESC} style={{ marginBottom: 22 }}></DescWrapper>
                <Steps current={-1} initial={0}>
                    <Step title="创建远程配置任务" description="创建远程配置任务，填写任务的目的或备注信息。" />
                    <Step title="添加配置数据" description="添加要更新的产品配置数据字段和更新的数值。" />
                    <Step title="选择设备" description="可通过设备ID/物理地址，设备标签，本地导入确定要配置的设备。" />
                    <Step title="执行任务" description="提交执行远程配置任务，设备更新结果实时可见。" />
                </Steps>
            </div>
            <div className='comm-shadowbox device-content'>
                {/* 查询 */}
                <div className='content-top'>
                    <div className='content-top-left'>
                        <Form
                            layout="inline"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 17 }}>
                            <Form.Item label="任务状态">
                                <Select
                                    allowClear
                                    onChange={val => setStatus(val)}
                                    style={{ width: 150, marginRight: 40 }}>
                                    {
                                        statusText.filter(item => item).map((item, index) => (<Option key={item} value={index}>{item}</Option>))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="任务名称">
                                <Search placeholder="请输入任务名称"
                                    allowClear
                                    onSearch={searchListData}
                                    style={{ width: 465 }} />
                            </Form.Item>
                        </Form>
                    </div>
                    <Button type="primary" onClick={() => addOrEditRemoteConfig()}>创建任务</Button>
                </div>
                {/* table */}
                <Table columns={PageColumns}
                    className="ant-table-fixed"
                    rowKey="taskId"
                    dataSource={remoteConfigList}
                    pagination={{
                        defaultCurrent: 1,
                        current: pager.pageIndex,
                        pageSize: pager.pageRows,
                        total: pager.totalRows,
                        showSizeChanger: false,
                        showQuickJumper: pager.totalPages > 5,
                        onChange: pagerChange,
                        showTotal: total => <span>共 <a>{total}</a> 条</span>
                    }}
                />
            </div>
            {/* 创建任务 */}
            {
                addVisible &&
                <CreateTaskModal
                    visible={addVisible}
                    allProductList={allProductList}
                    onCancel={() => { setAddVisible(false); setEditData({}) }}
                    editData={editData}
                    configProtoclList={configProtoclList}
                    getRemoteConfigList={getRemoteConfigList}
                ></CreateTaskModal>
            }

            {/* 删除弹窗 */}
            {
                deletevisible &&
                <ActionConfirmModal
                    visible={deletevisible}
                    modalOKHandle={deletelOKHandle}
                    modalCancelHandle={() => setDeleteParams({ deletevisible: false, deleteItem: null, deleteLoading: false })}
                    targetName={deleteItem.taskId}
                    confirmLoading={deleteLoading}
                    title={'删除任务'}
                    needWarnIcon={true}
                    descText={'即将删除的任务'}
                    tipText={'任务的所有信息将完全被删除，无法找回，请谨慎操作'}
                >
                </ActionConfirmModal>
            }

            {/* 查看详情 */}
            {
                detailVisible &&
                <CheckDetailModal
                    visible={detailVisible}
                    detailData={detailData}
                    allProductList={allProductList}
                    onCancel={() => setDetailVisible(false)}
                />

            }
        </div>
    )
}

export default RemoteConfig
