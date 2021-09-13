import React, { useState } from 'react'
import { Modal, Button, Table, Divider } from 'antd'
import { Notification } from '../../../../../components/Notification'
import { Paths, post } from '../../../../../api'

import './configFirmwareDetail.scss'

function ConfigFirmwareDetail({ productId, firmwareDetailData = [], firmwareDetailVisible, cancelHandle, showAddFirmware, showEditFirmware, getFirmwareList }) {

  const columns = [
    {
      title: '配置的固件模块标识',
      dataIndex: 'firmwareTypeMark',
      key: 'firmwareTypeMark'
    },
    {
      title: '配置的固件模块名称',
      dataIndex: 'firmwareTypeName',
      key: 'firmwareTypeName'
    },
    {
      title: '配置时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      render: (text, record, index) => (
        <div className="edit-ope" >
          {
            record.isCustom === 0 &&
            <>
              <span onClick={() => showEditFirmware(record)}>编辑</span>
              <Divider type="vertical" />
              <span onClick={() => deleteFirmwareItem(record)}>删除</span>
            </>
          }
        </div>
      )
    }
  ]

  // 删除固件
  const deleteFirmwareItem = (record) => {
    post(Paths.delFirmwareModule, { productId, id: record.id }).then(res => {
      Notification({ description: '操作成功！', type: 'success' })
      getFirmwareList()
    })
  }

  return (
    <Modal
      title="配置产品固件模块"
      visible={firmwareDetailVisible}
      width={857}
      onOk={cancelHandle}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="configfirmware-detail-modal">
        <Button type="primary" className="mar22" onClick={() => showAddFirmware('add')}>新增产品固件模块</Button>
        <Table rowKey="firmwareTypeNo" columns={columns} dataSource={firmwareDetailData} pagination={false} size="small" />
      </div>
    </Modal>
  )
}

export default ConfigFirmwareDetail
