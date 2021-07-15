import React, { useState, useCallback, useEffect } from 'react'
import { Modal, Input, Table } from 'antd';
import './replaceModule.scss'
const { Search } = Input;

export default function ReplaceModule({ isModalVisible, handleOk, handleCancel, selectedId }) {
  const [selectionType] = useState('radio');
  const columns = [
    { title: '模组', dataIndex: 'name' },
    { title: '芯片', dataIndex: 'id' },
    { title: '尺寸', dataIndex: '' },
    { title: '适用说明', dataIndex: '' },
    { title: '调试价格', dataIndex: '' },
    {
      title: '操作', dataIndex: '',
      render: (text, record, index) => <a>详情</a>
    }
  ];
  const [dataSource, setdataSource] = useState([
    {
      name: 'a',
      id: '1'
    },
    {
      name: '22',
      id: '2'
    },
    {
      name: 'aaaa',
      id: '3'
    }
  ]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([selectedId])
  const onSearch = value => {
    console.log(value)
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  };
  useEffect(() => {})

  return (
    <Modal
      title="更换模组"
      visible={isModalVisible}
      onOk={() => handleOk(selectedRowKeys)}
      onCancel={handleCancel}
      maskClosable={false}
      width={857}
      wrapClassName="replace-module-modal">
      {/* 搜索 */}
      <Search
        className="search-input"
        placeholder="输入模组名称"
        allowClear
        onSearch={onSearch}
        style={{ width: 674 }} />
        
      {/* table */}
      <Table
        rowSelection={{
          type: selectionType,
          selectedRowKeys,
          ...rowSelection,
        }}
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={false} />
    </Modal>
  )
}