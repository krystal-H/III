import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Form, Input, Table, Modal } from 'antd'
import { Paths, post, get } from '../../../../api'
const { TextArea } = Input;
export default function AddModel({ detailVis, onCancel, actionData }) {
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        getDetail()
    }, [])
    const [detailObj, setDetailObj] = useState({})
    const getDetail = () => {
        const params = {
            taskId: actionData.taskId
        }
        post(Paths.singelDeviceRemoset, params).then(data => {
            setDetailObj(data.data)
            setTableData(JSON.parse(data.data.remoteProtocol.protocolJson))
            console.log(JSON.parse(data.data.remoteProtocol.protocolJson), 6666)
            // if(data.data.remoteProtocol && data.data.remoteProtocol.protocolJson && JSON.parse(data.data.remoteProtocol.protocolJson).length){
            //     // setTableData(JSON.parse(data.data.remoteProtocol.protocolJson))
            // }
        })
    }
    const columns = [
        {
            title: '数据名称',
            dataIndex: 'name',
            key: 'name',
            width: 160,
        },
        {
            title: '数据标识',
            dataIndex: 'identifier',
            key: 'identifier'
        },
        {
            title: '数据类型',
            dataIndex: 'dataType',
            key: 'dataType',
            render: (text, record) => {
                return (<span>{record.dataType.type}</span>)
            }
        },
        {
            title: '数据属性',
            render: (text, record) => {
                switch (record.dataType.type) {
                    case 'int':
                        return <span>{record.dataType.specs.min} ~ {record.dataType.specs.max}</span>
                    case 'double':
                        return <span>{record.dataType.specs.min} ~ {record.dataType.specs.max}</span>
                    case 'float':
                        return <span>{record.dataType.specs.min} ~ {record.dataType.specs.max}</span>
                    case 'text':

                        break;
                    case 'enum':
                        return (
                            <span>{Object.values(record.dataType.specs).join(' | ')}</span>
                        )
                    case 'date':
                        break;
                    case 'bool':
                        return (
                            <span>{Object.values(record.dataType.specs).join(' | ')}</span>
                        )
                    default:
                        break;
                }
            }
        },
        {
            title: '下发数据',
            dataIndex: 'sendData',
            key: 'sendData',
            width: 180
        }
    ]
    return (
        <div >
            <Modal title="远程配置任务" visible={detailVis} footer={null} onOk={onCancel} onCancel={onCancel} width='1100px' wrapClassName='add-protocols-wrap'>
                <div>

                    <Form
                        form={form}
                    >
                        <Form.Item
                            label="任务名称"
                            name="problemType"
                        >
                            <span>{detailObj.taskName}</span>
                        </Form.Item>
                        <Form.Item
                            label="任务说明"
                            name="problemDesc"
                        >
                            <span>{detailObj.taskExplain}</span>
                        </Form.Item>
                    </Form>
                    <div style={{ marginBottom: '10px' }}>配置数据</div>
                    <Table dataSource={tableData} columns={columns}  rowKey='identifier'/>
                </div>
            </Modal>
        </div>
    )
}