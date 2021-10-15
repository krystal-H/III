import React, { useState, useEffect } from 'react'
import { Modal, Input, Table } from 'antd'
import { Paths, post } from '../../../../../api'

import './replaceModule.scss'
const { Search } = Input

const productItemData = JSON.parse(sessionStorage.getItem('productItem')) || {}

function ReplaceModule({ title, desc = "", type, replaceModalVisible, handleOk, handleCancel, schemeId, moduleId }) {
  const [selectionType] = useState('radio')
  const columns = [
    { title: '模组', dataIndex: 'moduleName' },
    { title: '芯片', dataIndex: 'originalModuleTypeName' },
    {
      title: '尺寸', key: '',
      render: (text, record, index) => (
        <div>
          <span>{record.sizeWidth}x{record.sizeHeight}x{record.sizeThickness}</span>
        </div>
      )
    },
    { title: '适用说明', dataIndex: 'applyScope' },
    { title: '调试价格', dataIndex: 'price' },
    {
      title: '操作', dataIndex: '',
      render: (text, record, index) => <a onClick={() => downInstructions(record.readmePdf)}>说明书</a>
    }
  ]
  const columns2 = [
    { title: '方案', dataIndex: 'name' },
    { title: '版本', dataIndex: 'id' },
    { title: '适用说明', dataIndex: '' }
  ]
  const [dataSource, setdataSource] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([moduleId])

  // 下载说明书
  const downInstructions = (readmePdf) => {
    readmePdf ? window.location = readmePdf : alert('暂无数据！')
  }

  // 搜索模组
  const onSearch = value => {
    if (value && !!value.trim()) {
      getReplaceModuleList(value.trim())
    } else {
      getReplaceModuleList('')
    }
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  // 获取模组列表
  const getReplaceModuleList = (moduleName) => {
    post(Paths.replaceModuleList, {
      schemeId,
      moduleName,
      moduleType: Number(productItemData.bindType) || -1,
      networkType: Number(productItemData.netTypeId) || -1
    }, { loading: true })
      .then(res => {
        console.log(res)
        setdataSource(res.data)
      })
  }

  useEffect(() => {
    getReplaceModuleList('')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      title={title}
      visible={replaceModalVisible}
      onOk={() => handleOk(selectedRowKeys)}
      onCancel={() => handleCancel(type)}
      maskClosable={false}
      width={857}
      wrapClassName="replace-module-modal">
      {desc && <div className="replace-firmware-desc">{desc}</div>}

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
        rowKey="moduleId"
        columns={type === 'module' ? columns : columns2}
        dataSource={dataSource}
        pagination={false} />
    </Modal>
  )
}

export default ReplaceModule
