import React, { useState, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Table, Divider, Tooltip, Select, Steps, Input, Form, Row, Col } from 'antd'
import { DateTool, setFuncDataType, addKeyToTableData, createArrayByLength } from '../../../../util/util'
import stepImg from '../../../../assets/images/remote-config.png'
import DescWrapper from '../../../../components/desc-wrapper/DescWrapper'
import ActionConfirmModal from '../../../../components/action-confirm-modal/ActionConfirmModal'
import { cloneDeep } from 'lodash'
import { Paths, post, get } from '../../../../api'
import { Notification } from '../../../../components/Notification';
import AddModel from './addModel'
import EditModel from './editModel'
import DetailModel from './detail'
import './index.scss'

const { Option } = Select
const { Step } = Steps
const { Search } = Input
const statusTextForDevice = ['草稿', '待执行', '执行成功', '执行失败']

function RemoteConfig({ devceId }) {
    const [addVisible, setAddVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [actionData, setActionData] = useState({})
    const [deleteParams, setDeleteParams] = useState({ deletevisible: false, deleteItem: null, deleteLoading: false })
    const [remoteConfigList, setRemoteConfigList] = useState([]) // table-datasorce
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 }) //分页
    const { deletevisible, deleteItem, deleteLoading } = deleteParams
    // 执行任务
    const executeRemoteConfig = (record) => {
        post(Paths.excelDevTask, { taskId: record.taskId }, { loading: true }).then(res => {
            getRemoteConfigList()
            Notification({ description: '执行成功！', type: 'success' })
        }).catch(res => {
            getRemoteConfigList()
        })
    }
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
            render: (text, record) => {
                return <div className='single-text' style={{width:400}}>{text}</div>
            }
        },
        {
            title: '任务状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                let { status } = record;
                return <span className={`device-h5-statu-${status + 1}`}>{statusTextForDevice[status]}</span>
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
                    ('' + status) === '1' ?
                        <React.Fragment>
                            <a onClick={() => openEdit(record)}>编辑</a>
                            <Divider type="vertical" />
                            <a onClick={() => executeRemoteConfig(record)}>执行</a>
                            <Divider type="vertical" />
                            <a onClick={() => setDeleteParams({ deletevisible: true, deleteItem: record })}>删除</a>
                        </React.Fragment> :
                        <a onClick={() => showRomoteConfigDetail(record)}>查看</a>
                )
            }
        }
    ]

    // 新增
    const addOrEditRemoteConfig = () => {
        setAddVisible(true)
    }
    //详情
    const [detailVis, setDetailVis] = useState(false)
    const showRomoteConfigDetail = (data) => {
        setActionData(data)
        setDetailVis(true)
    }
    const detailCancel = () => {
        setDetailVis(false)
    }

    useEffect(() => {
        if(devceId){
            getRemoteConfigList()
        }
    }, [pager.pageRows, pager.pageIndex,devceId])

    // 获取远程配置列表
    const getRemoteConfigList = (_pageIndex, status = '', taskName = '') => {
        const params = {
            deviceId: devceId,
            ...pager
        }
        post(Paths.deviceRemoteConfigList, params, { loading: true }).then(data => {
            const { list = [] } = data.data
            setRemoteConfigList(addKeyToTableData(list))
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { totalRows: data.data.pager.totalRows })
            })
        })
    }

    // 确定删除
    const deletelOKHandle = () => {
        const { taskId } = deleteItem
        post(Paths.delDeviceRemoset, { taskId }).then(data => {
            Notification({
                type: 'success',
                description: '删除成功！',
            });
            setDeleteParams({ deletevisible: false, deleteItem: null, deleteLoading: false })
            getRemoteConfigList()
        })
    }
    //页码改变
    const pagerChange = (pageIndex, pageRows) => {
        if (pageRows === pager.pageRows) {
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
    //新增
    const CancelAdd = () => {
        setAddVisible(false)
    }
    const addOk = () => {
        getRemoteConfigList()
        setAddVisible(false)
    }
    //编辑
    const openEdit = (data) => {
        setActionData(data)
        setEditVisible(true)
    }
    const CancelEdit = () => {
        setEditVisible(false)
    }
    const EditOk = () => {
        getRemoteConfigList()
        setEditVisible(false)
    }
    //帮助文档
    const downFile = () => {
        window.open('https://cms.clife.cn/clifeIotDoc/')
    }
    return (
        <div id='device-remote-config'>
            <div className='comm-shadowbox setp-tip'>
                <div className='step-title'>
                    <img src={stepImg} alt="" />
                    <span>远程配置步骤</span>
                </div>
                <DescWrapper style={{ marginBottom: 18, width: '100%', display: 'flex', alignItems: 'center' }}
                    desc={[<div>平台支持远程更新设备的配置数据，您可以提交远程配置任务，实时对设备的系统参数等数据进行远程更新，并且获取设备配置的更新状态。详细说明可参考<a onClick={downFile}>帮助文档</a></div>]}>
                </DescWrapper>
                <Steps current={-1} initial={0}>
                    <Step title="创建远程配置任务" description="创建远程配置任务，填写任务的目的或备注信息。" />
                    <Step title="添加配置数据" description="添加要更新的产品配置数据字段和更新的数值。" />
                    <Step title="执行任务" description="提交执行远程配置任务，设备更新结果实时可见。" />
                </Steps>
            </div>
            <div className='comm-shadowbox device-content'>
                {/* 查询 */}
                <div className='content-top'>
                    <div> </div>
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
                        onChange: pagerChange,
                        pageSize: pager.pageRows,
                        total: pager.totalRows,
                        showQuickJumper: true,
                        pageSizeOptions: [10],
                        showTotal: () => <span>共 <a>{pager.totalRows}</a> 条</span>
                    }}
                />
            </div>
            {/* 删除弹窗 */}
            {
                deletevisible &&
                <ActionConfirmModal
                    visible={deletevisible}
                    modalOKHandle={deletelOKHandle}
                    modalCancelHandle={() => setDeleteParams({ deletevisible: false, deleteItem: null, deleteLoading: false })}
                    targetName={deleteItem.taskName}
                    confirmLoading={deleteLoading}
                    title={'删除任务'}
                    needWarnIcon={true}
                    descText={'即将删除的任务'}
                    tipText={'任务的所有信息将完全被删除，无法找回，请谨慎操作'}
                >
                </ActionConfirmModal>
            }
            {
                addVisible && <AddModel addVisible={addVisible} addOk={addOk} CancelAdd={CancelAdd} deviceId={devceId}/>
            }
            {
                detailVis && <DetailModel detailVis={detailVis} onCancel={detailCancel} actionData={actionData} deviceId={devceId}/>
            }
            {
                editVisible && <EditModel addVisible={editVisible} actionData={actionData} addOk={EditOk} CancelAdd={CancelEdit} deviceId={devceId}/>
            }
        </div>
    )
}

export default RemoteConfig
