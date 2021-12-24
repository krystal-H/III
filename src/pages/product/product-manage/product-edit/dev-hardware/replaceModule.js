// 更换模组和修改固件使用同一个

import React, { useState, useEffect } from 'react'
import { Modal, Input, Table } from 'antd'
import { Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'

import './replaceModule.scss'
const { Search } = Input

function ReplaceModule({
  title,
  desc = "",
  opeType,
  replaceModalVisible,
  handleOk,
  handleCancel,
  schemeId,
  moduleId,
  productId,
  firmwareId
}) {
  const [searchVal, setSearchVal] = useState('') // 查询的字段
  const [dataSource, setdataSource] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([opeType === 'module' ? moduleId : firmwareId])
  const [productItemData] = useState(JSON.parse(sessionStorage.getItem('productItem')) || {})

  const moduleColumns = [
    { title: '模组', dataIndex: 'moduleName' },
    { title: '芯片', dataIndex: 'originalModuleTypeName' },
    {
      title: '尺寸', key: '',
      render: (text, record) => (
        <div>
          <span>{record.sizeThickness}x{record.sizeWidth}x{record.sizeHeight}</span>
        </div>
      )
    },
    { title: '适用说明', dataIndex: 'applyScope' },
    { title: '调试价格', dataIndex: 'price' },
    {
      title: '操作', dataIndex: '',
      render: (text, record) => <a onClick={() => downInstructions(record.readmePdf)}>说明书</a>
    }
  ]

  // 更换固件
  const firmwareColumns = [
    { title: '固件名称', dataIndex: 'burnFileName' },
    { title: '版本', dataIndex: 'burnFileVersion' },
  ]


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
    }, { loading: true }).then(res => {
      setdataSource(res.data)
    })
  }

  // 获取固件列表
  const getFirmwareList = () => {
    post(Paths.getDevFirmwareList, {
      moduleId,
      burnFileName: searchVal
    }).then(res => {
      setdataSource(res.data)
    })
  }

  // 判断执行  模组/固件方法
  const judgeFunc = () => {
    opeType === 'module' && getReplaceModuleList()
    opeType === 'firmware' && getFirmwareList()
  }

  useEffect(() => {
    judgeFunc()
  }, [searchVal]) // eslint-disable-line react-hooks/exhaustive-deps

  // 确定
  const judgeHandleOk = () => {
    if (opeType === 'module') {
      handleOk(selectedRowKeys)
    }
    if (opeType === 'firmware') {
      post(Paths.saveChooseFirmware, { productId, firmwareId: Number(selectedRowKeys.join('')) })
        .then(res => {
          Notification({ description: '操作成功！', type: 'success' })
          handleOk(selectedRowKeys)
        })
    }
  }

  return (
    <Modal
      title={title}
      visible={replaceModalVisible}
      onOk={() => judgeHandleOk()}
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
          type: 'radio',
          selectedRowKeys,
          ...rowSelection,
        }}
        rowKey={opeType === 'module' ? "moduleId" : "id"}
        columns={opeType === 'module' ? moduleColumns : firmwareColumns}
        dataSource={dataSource}
        pagination={false} />
    </Modal>
  )
}

export default ReplaceModule
