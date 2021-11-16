import React, { useState, useEffect } from 'react'
import { Modal, Input, Table } from 'antd'
import { Paths, post } from '../../../../../api'

import './replaceModule.scss'
const { Search } = Input

function ReplaceModule({ title, desc = "", opeType, replaceModalVisible, handleOk, handleCancel, schemeId, moduleId }) {
  const productItemData = JSON.parse(sessionStorage.getItem('productItem')) || {}
  const [selectionType] = useState('radio')
  const [searchVal, setSearchVal] = useState('') // 查询的字段
  const moduleColumns = [
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
  const firmwareColumns = [
    { title: '方案', dataIndex: 'name' },
    { title: '版本', dataIndex: 'burnFileVersion' },
    { title: '适用说明', dataIndex: '' }
  ]
  const [dataSource, setdataSource] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([moduleId])

  // 下载说明书
  const downInstructions = (readmePdf) => {
    readmePdf ? window.open(readmePdf) : alert('暂无数据！')
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  // 获取模组列表
  const getReplaceModuleList = () => {
    post(Paths.replaceModuleList, {
      schemeId,
      moduleName: searchVal,
      moduleType: Number(productItemData.bindType) || -1,
      networkType: Number(productItemData.netTypeId) || -1
    }, { loading: true })
      .then(res => {
        setdataSource(res.data)
      })
  }

  // 获取固件列表
  const getFirmwareList = (firmwareName) => {
    console.log('=======等后端补充接口！！！')
  }

  // 判断执行  模组/固件方法
  const judgeFunc = () => {
    opeType === 'module' && getReplaceModuleList()
    opeType === 'firmware' && getFirmwareList()
  }

  useEffect(() => {
    judgeFunc()
  }, [searchVal]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      title={title}
      visible={replaceModalVisible}
      onOk={() => handleOk(selectedRowKeys)}
      onCancel={() => handleCancel(opeType)}
      maskClosable={false}
      width={857}
      wrapClassName="replace-module-modal">
      {desc && <div className="replace-firmware-desc">{desc}</div>}

      {/* 搜索 */}
      <Search
        className="search-input"
        placeholder={opeType === 'module' ? "输入模组名称" : "请输入固件名称"}
        allowClear
        onSearch={(val) => setSearchVal(val)}
        style={{ width: 674 }} />

      {/* table */}
      <Table
        rowSelection={{
          type: selectionType,
          selectedRowKeys,
          ...rowSelection,
        }}
        rowKey="moduleId"
        columns={opeType === 'module' ? moduleColumns : firmwareColumns}
        dataSource={dataSource}
        pagination={false} />
    </Modal>
  )
}

export default ReplaceModule
