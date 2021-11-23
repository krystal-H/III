import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Divider, Form } from 'antd';
import { post, Paths } from '../../../../../api';
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal'
import { cloneDeep } from 'lodash'
import { DateTool } from '../../../../../util/util'
 function InfoModal({ baseInfo, projectId },ref) {
    const [form] = Form.useForm();
    const [deletevisible, setDeletevisible] = useState(false)
    const [actionData, setActionData] = useState({})
    const [infoVisible, setInfoVisible] = useState(false) //详情
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 }) //分页
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
            title: '批次名称',
            dataIndex: 'batchName',
            key: 'batchName',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(createTime) {
                return createTime && DateTool.utcToDev(createTime);
            }
        },
        {
            title: '导入成功数量',
            dataIndex: 'batchCount',
            key: 'batchCount',
        }, {
            title: '操作',
            dataIndex: '',
            key: '',
            render(text, record) {
                return <span><a onClick={() => { openDia(record) }}>查看详情</a></span>
            }
        },
    ];
    const deletelOKHandle = () => { }
    //搜索
    const onSearch = () => {
        if (pager.pageIndex == 1) {
            getList()
        } else {
            setPager(pre => {
                let obj = cloneDeep(pre)
                obj.pageIndex = 1
                return obj
            })
        }
    }
   
    useEffect(() => {
        if (projectId) {
            getList()
        }
    }, [pager.pageIndex, projectId])
    //列表
    const getList = (loading = true) => {
        let params = {
            ...pager,
            projectId,
        }
        if (form.getFieldValue('batchName') && form.getFieldValue('batchName').trim()) {
            params.batchName = form.getFieldValue('batchName')
        }
        post(Paths.projectInfoBatchList, params, { loading }).then((res) => {
            setDataSource(res.data.list)
            setPager(pre => {
                let obj = cloneDeep(pre)
                obj.totalRows = res.data.pager.totalRows
                return obj
            })
        });
    }
    
    //详情
    const openDia = (data) => {
        setActionData(data)
        setInfoVisible(true)
    }
    const closeInfo = () => {
        setInfoVisible(false)
    }
    // 翻页
    const pagerChange = (pageIndex, pageRows) => {
        setPager(pre => {
            return Object.assign(cloneDeep(pre), { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
        })
    }
    useImperativeHandle(ref, () => ({
        reFresh: getList
    }));
    return (
        <div >
            <div className='device-info-wrap'>
                <div className='filter'>
                    <Form form={form} layout='inline' >
                        <Form.Item
                            label='批次名称'
                        >
                            <Form.Item
                                name='batchName'
                                noStyle
                            >
                                <Input style={{ width: '190px' }} placeholder="请输入批次名称" />
                            </Form.Item>
                            <Button type="primary" onClick={onSearch}>
                                查询
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
                <div className='content'>
                    {/* <div className='action'>
                        <span>{`已选择${selectedKey.length}项`}</span>
                        <Divider type="vertical" style={{ borderColor: '#333' }} />
                        <a onClick={() => { openDel('many') }}>删除</a>
                    </div> */}
                    <Table dataSource={dataSource} columns={columns} rowKey="batchId" 
                        pagination={{
                            defaultCurrent: 1,
                            current: pager.pageIndex,
                            pageSize: pager.pageRows,
                            total: pager.totalRows,
                            showSizeChanger: false,
                            showQuickJumper: pager.totalPages > 5,
                            onChange: pagerChange,
                            showTotal: total => <span>共 <a>{total}</a> 条</span>
                        }} />
                </div>
            </div>
            {
                deletevisible &&
                <ActionConfirmModal
                    visible={deletevisible}
                    modalOKHandle={deletelOKHandle}
                    modalCancelHandle={() => setDeletevisible(false)}
                    targetName={actionData.taskName}
                    title={'删除分组'}
                    needWarnIcon={true}
                    descText={'即将删除的分组'}
                    tipText={'删除的信息，无法找回，请谨慎操作'}
                >
                </ActionConfirmModal>
            }
            {
                infoVisible && <DetailInfo isModalVisible={infoVisible} colseMoadl={closeInfo} actionData={actionData} />
            }
        </div>
    )
}
function DetailInfo({ isModalVisible, colseMoadl, actionData }) {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        post(Paths.projectBatchInfo, { batchId: actionData.batchId }).then((res) => {
            setDataSource(res.data.list)
        });
    }, [])
    const columns = [
        {
            title: '批次名称',
            dataIndex: 'batchName',
            key: 'batchName',
        },
        {
            title: '物理地址',
            dataIndex: 'physicalAddress',
            key: 'physicalAddress',
        },
        {
            title: '设备ID',
            dataIndex: 'deviceUniqueId',
            key: 'deviceUniqueId',
        }, {
            title: '设备IMEI',
            dataIndex: '',
            key: '',
            render() {
                return '--';
            }
        }
    ];
    return <div>
        <Modal title="查看详情" footer={null} visible={isModalVisible} onCancel={colseMoadl} width='904px' wrapClassName='add-protocols-wrap'>
            <div>
                <Table dataSource={dataSource} columns={columns} scroll={{ y: 440 }} rowKey="detailId" pagination={false} />
            </div>
        </Modal>
    </div>
}
export default forwardRef(InfoModal)