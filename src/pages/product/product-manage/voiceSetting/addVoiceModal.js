import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button, Select, Steps, Form, Input, Table } from 'antd'
import { cloneDeep } from 'lodash'

function AddVoice({ visible, handleCancel, handleOk }) {
  const [dataSource, setDataSource] = useState([])
  const [selectedCount, setSelectedCount] = useState(0)

  const columns = [
    {
      title: '语音能力ID',
      dataIndex: '',
      key: '',
    },
    {
      title: '语音能力名称',
      dataIndex: '',
      key: ''
    },
    {
      title: '语言调用词',
      dataIndex: '',
      key: '',
    },
    {
      title: '关联物模型功能',
      dataIndex: '',
      key: ''
    }
  ]


  const data = [
    {
      key: '1',
    },
    {
      key: '2',
    },
    {
      key: '3',
    },
    {
      key: '4',
    }
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedCount(selectedRows.length)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    }
  }

  return (
    <Modal
      title="增加能力"
      destroyOnClose
      maskClosable={false}
      visible={visible}
      width={1100}
      onOk={handleOk}
      onCancel={handleCancel}>
      <div style={{ marginBottom: 10 }}>
        已选择<a>&nbsp;{selectedCount}&nbsp;</a>项
      </div>
      <div>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          rowKey="key"
          columns={columns}
          dataSource={data}
          pagination={false} />
      </div>
    </Modal>
  )
}

export default AddVoice
