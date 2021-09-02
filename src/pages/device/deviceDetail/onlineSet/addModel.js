import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Form, Input, Table, Modal } from 'antd'
const { TextArea } = Input;
export default function AddModel({ addVisible, addOk, CancelAdd }) {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([])
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
      dataIndex: 'execTime',
      key: 'execTime',
      width: 180,
    }
  ]
  return (
    <div >
      <Modal title="远程配置任务" visible={addVisible} onOk={addOk} onCancel={CancelAdd} width='900px' wrapClassName='add-protocols-wrap'>
        <div>

          <Form
            form={form}
          >
            <Form.Item
              label="任务名称"
              name="problemType"
              rules={[{ required: true }]}
            >
              <Input  />
            </Form.Item>
            <Form.Item
              label="任务说明"
              name="problemDesc"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Form>
          <div>请添加配置信息</div>
          <Table dataSource={tableData} columns={columns} rowKey='workOrderId' />
        </div>
      </Modal>
    </div>
  )
}