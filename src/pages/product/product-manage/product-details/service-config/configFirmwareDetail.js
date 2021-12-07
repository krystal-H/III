import React, { useState } from 'react'
import { Modal, Table } from 'antd'
import { DateTool } from '../../../../../util/util'

import './configFirmwareDetail.scss'

function ConfigFirmwareDetail({ firmwareDetailData = [], firmwareDetailVisible, cancelHandle }) {

  const columns = [
    {
      title: '编号',
      dataIndex: 'firmwareTypeNo',
      key: 'firmwareTypeNo'
    },
    {
      title: '名称',
      dataIndex: 'firmwareTypeName',
      key: 'firmwareTypeName'
    },
    {
      title: '配置时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text, record) => {
        let { createTime } = record;
        return <span>{createTime ? DateTool.utcToDev(createTime) : '--'}</span>
      }
    },
  ]

  return (
    <Modal
      title="配置产品固件模块详情"
      visible={firmwareDetailVisible}
      width={857}
      onOk={cancelHandle}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="configfirmware-detail-modal">
        <Table rowKey="firmwareTypeNo"
          columns={columns}
          dataSource={firmwareDetailData}
          pagination={false}
          size="small" />
      </div>
    </Modal>
  )
}

export default ConfigFirmwareDetail
