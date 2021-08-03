import React, { useState } from 'react';
import { Modal, Button, Table } from 'antd';

import './configFirmwareDetail.scss'

function ConfigFirmwareDetail({ firmwareDetailVisible, cancelHandle, showAddFirmware, showEditFirmware }) {
  const columns = [
    {
      title: '配置的固件模块标识',
      dataIndex: 'val1',
    },
    {
      title: '配置的固件模块名称',
      dataIndex: 'val2',
    },
    {
      title: '配置时间',
      dataIndex: 'val3',
    },
    {
      title: '操作',
      render: (text, record, index) => (
        <div className="edit-ope" onClick={() => showEditFirmware(record)}>编辑</div>
      )
    }
  ]
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      val1: '111',
      val2: '控制面板',
      val3: '2021-06-06 15:35:25'
    },
    {
      key: 11,
      val1: 'aaa',
      val2: '控制面板',
      val3: '2021-06-06 15:35:25'
    },
    {
      key: 111,
      val1: 'bbb',
      val2: '驱动面板',
      val3: '2021-06-06 15:35:25'
    }
  ])
  const onOk = () => {

  }
  return (
    <Modal
      title="配置产品固件模块"
      visible={firmwareDetailVisible}
      width={857}
      onOk={onOk}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="configfirmware-detail-modal">
        <Button type="primary" className="mar22" onClick={showAddFirmware}>新增产品固件模块</Button>
        <Table columns={columns} dataSource={dataSource} pagination={false} size="small" />
      </div>
    </Modal>
  )
}

export default ConfigFirmwareDetail
